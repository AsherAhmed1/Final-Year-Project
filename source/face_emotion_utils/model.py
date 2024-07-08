import sys
import time
import traceback
from torch.utils.data import Dataset, DataLoader
import cv2
from matplotlib import pyplot as plt

import source.face_emotion_utils.preprocess_main as data
import source.face_emotion_utils.utils as utils
import source.face_emotion_utils.face_config as face_config
import source.config as config

import source.pytorch_utils.callbacks as pt_callbacks
import source.pytorch_utils.training_utils as pt_train
import source.pytorch_utils.hyper_tuner as pt_tuner

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision.models import *
from tqdm import tqdm
import numpy as np
import csv
import os

from hyperopt import hp, STATUS_OK, fmin, tpe, space_eval, Trials, rand
import albumentations as albu


enable_validation = True
train_cnt = 0
tune_cnt = 0
total_tune_cnt = 0
start_time = 0

# tune_hp_ranges = {}
device = config.device

TUNE_TARGET = face_config.TUNE_TARGET
TUNE_MODE = face_config.TUNE_MODE
TUNER_CSV_SAVE_PATH = config.FACE_TUNER_CSV_SAVE_PATH
TUNER_SAVE_PATH = config.FACE_TUNER_SAVE_PATH
BEST_HP_JSON_SAVE_PATH = config.FACE_BEST_HP_JSON_SAVE_PATH
TUNE_HP_RANGES = face_config.tune_hp_ranges
MAX_TRIALS = face_config.max_trails

INITIAL_LR = face_config.lr
INITIAL_EPOCH = face_config.initial_epoch
REDUCE_LR_FACTOR = face_config.reduce_lr_factor
REDUCE_LR_PATIENCE = face_config.reduce_lr_patience
EARLY_STOPPING_PATIENCE = face_config.patience_epoch
SOFTMAX_LEN = face_config.softmax_len
FACE_SIZE = face_config.FACE_SIZE

MODEL_SAVE_PATH = config.FACE_MODEL_SAVE_PATH

MAX_THREADS = config.MAX_THREADS

os.environ['CUDA_LAUNCH_BLOCKING'] = '1'


class CustomModelBase(pt_train.CustomModelBase):
    """
    ModelBase override for training and validation steps
    """
    def __init__(self, class_weights):
        super(CustomModelBase, self).__init__()
        self.class_weights = class_weights
        

    def training_step(self, batch):
        # print("batch: ", len(batch))
        images, lands, labels = batch

        out = self(images, lands)  # Generate predictions
        loss = F.cross_entropy(out, labels, weight=self.class_weights)  # Calculate loss with class weights
        acc = pt_train.accuracy(out, labels)  # Calculate accuracy
        return loss, acc

    def validation_step(self, batch):
        images, lands, labels = batch
        out = self(images, lands)  # Generate predictions
        loss = F.cross_entropy(out, labels, weight=self.class_weights)  # Calculate loss with class weights
        acc = pt_train.accuracy(out, labels)  # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}


class CustomModel(CustomModelBase):
    """
        A custom model that inherits from CustomModelBase.
        This class is meant to be used with the training_utils.py module.

        Parameters
        ----------
        input_shape - The shape of the input data (n, 3, height, width), (n, 1404)
        dropout_rate - The dropout rate to use
        dense_units - The number of units in the dense layer
        num_layers - The number of dense layers
        l1_l2_reg - The L1 and L2 regularization to use (Not implemented yet)
        layers_batch_norm - Whether to use batch normalization in the dense layers
        conv_model_name - The name of the convolutional model to use. Choose from the list in the get_conv_model function
        class_weights : list - The class weights to use. If None, all classes will have the same weight
        device - The device to use
    """

    def __init__(
            self,
            input_shapes,
            dropout_rate,
            dense_units,
            num_layers,
            l1_l2_reg,
            layers_batch_norm,
            conv_model_name,
            use_landmarks,
            class_weights=None,
            device=device,
    ):

        if class_weights is None:
            class_weights = torch.ones(SOFTMAX_LEN)
        else:
            class_weights = torch.tensor(class_weights)

        # convert to cuda tensor
        class_weights = class_weights.to(device)

        super(CustomModel, self).__init__(class_weights=class_weights)

        self.use_landmarks = use_landmarks

        input_shape, input_shape_2 = input_shapes

        self.base_model_conv = self.get_conv_model(conv_model_name, pretrained=True)

        # Remove the final classification layer (fc)
        self.base_model = nn.Sequential(*list(self.base_model_conv.children())[:-1])

        self.flatten = nn.Flatten()

        # Determine the output size of the base model
        with torch.no_grad():
            sample_input = torch.randn(1, input_shape[0], input_shape[1], input_shape[2])
            print("sample_input: ", sample_input.shape)
            self.base_output_size = self.base_model(sample_input).numel()

        # Calculate the input size for the dense layers
        dense_input_size = self.base_output_size + input_shape_2

        dense_layers = []
        for _ in range(num_layers - 1):  # Update the range to num_layers - 1
            dense_layer = [
                nn.Linear(dense_units, dense_units),
                nn.ReLU(),
                nn.Dropout(dropout_rate)
            ]
            if layers_batch_norm:
                dense_layer.append(nn.BatchNorm1d(dense_units))
            dense_layers.extend(dense_layer)

        self.fc = nn.Sequential(
            nn.Linear(dense_input_size, dense_units),  # Update the input size for the first dense layer
            nn.BatchNorm1d(dense_units),
            *dense_layers,
        )

        self.out_lands = nn.Linear(dense_units, SOFTMAX_LEN)
        self.out_no_lands = nn.Linear(self.base_output_size, SOFTMAX_LEN)

    def get_conv_model(self, conv_model_name, pretrained=True):
        if conv_model_name == "resnet50":
            return resnet50(pretrained=pretrained)
        elif conv_model_name == "resnet18":
            return resnet18(pretrained=pretrained)
        elif conv_model_name == "resnet34":
            return resnet34(pretrained=pretrained)
        elif conv_model_name == "resnet101":
            return resnet101(pretrained=pretrained)
        elif conv_model_name == "resnet152":
            return resnet152(pretrained=pretrained)
        elif conv_model_name == "resnext50_32x4d":
            return resnext50_32x4d(pretrained=pretrained)
        elif conv_model_name == "resnext101_32x8d":
            return resnext101_32x8d(pretrained=pretrained)
        elif conv_model_name == "wide_resnet50_2":
            return wide_resnet50_2(pretrained=pretrained)
        elif conv_model_name == "wide_resnet101_2":
            return wide_resnet101_2(pretrained=pretrained)
        elif conv_model_name == "inception":
            raise NotImplementedError
            # not working as of now
            model = inception_v3(pretrained=pretrained)
            model.avgpool = nn.AdaptiveAvgPool2d((2, 2))
            return model
        elif conv_model_name == "googlenet":
            return googlenet(pretrained=pretrained)
        elif conv_model_name == "mobilenet":
            return mobilenet_v2(pretrained=pretrained)
        elif conv_model_name == "densenet":
            return densenet121(pretrained=pretrained)
        elif conv_model_name == "alexnet":
            return alexnet(pretrained=pretrained)
        elif conv_model_name == "vgg16":
            return vgg16(pretrained=pretrained)
        elif conv_model_name == "squeezenet":
            return squeezenet1_0(pretrained=pretrained)
        elif conv_model_name == "shufflenet":
            return shufflenet_v2_x1_0(pretrained=pretrained)
        elif conv_model_name == "mnasnet":
            return mnasnet1_0(pretrained=pretrained)
        else:
            raise ValueError("Invalid model name, exiting...")

    def forward(self, x1, x2=None):
        x1 = self.base_model(x1)
        x1 = self.flatten(x1)

        if self.use_landmarks:
            x = torch.cat((x1, x2), dim=1)
            x = self.fc(x)
            x = self.out_lands(x)
        else:
            x = self.out_no_lands(x1)

        return x


def get_callbacks(
        optimiser,
        result,
        model,
        continue_training=False,
        defined_callbacks=None,
        reduce_lr_factor=REDUCE_LR_FACTOR,
        reduce_lr_patience=REDUCE_LR_PATIENCE,
        early_stopping_patience=EARLY_STOPPING_PATIENCE,
):
    """
    Parameters
    ----------
    optimiser: torch.optim.Optimizer
    result: dict
        dictionary with keys 'train_loss', 'val_acc', 'train_acc', 'val_loss', and any other metrics you want to use
    model: pt_train.CustomModelBase
        Model must override the CustomModelBase class
    continue_training: bool
        Indicates whether training should continue
    defined_callbacks
        Default is None. If None, then the default callbacks will be used.
    reduce_lr_factor: float
    reduce_lr_patience: int
    early_stopping_patience: int

    Returns
    -------
    defined_callbacks: dict of pt_callbacks.Callbacks

    step_flag: bool
        True if the training should stop, False otherwise, based on the early stopping callback
    """

    if defined_callbacks is None:
        defined_callbacks = {
            'val': pt_callbacks.Callbacks(model_save_path=MODEL_SAVE_PATH, optimizer=optimiser),
            'train': pt_callbacks.Callbacks(optimizer=optimiser)
        }

    defined_callbacks['val'].model_checkpoint(
        model=model,
        monitor_value=result['val_acc'],
        mode='max',
        indicator_text="Val checkpoint: "
    )
    defined_callbacks['train'].reduce_lr_on_plateau(
        monitor_value=result['train_loss'],
        mode='min',
        factor=reduce_lr_factor,
        patience=reduce_lr_patience,
        indicator_text="Train LR scheduler: "
    )
    stop_flag = defined_callbacks['val'].early_stopping(
        monitor_value=result['val_acc'],
        mode='max',
        patience=early_stopping_patience,
        indicator_text="Val early stopping: "
    )

    # Pass continue_training to relevant callbacks
    defined_callbacks['train'].continue_training = continue_training
    defined_callbacks['val'].continue_training = continue_training  # Assuming you want to pass it to the 'val' callback as well

    defined_callbacks['train'].clear_memory()
    print("_________")

    return defined_callbacks, stop_flag



def train(hp_dict, metric='val_acc', metric_mode='max', preprocess_again=False, initial_lr=INITIAL_LR, epochs=INITIAL_EPOCH, max_threads=MAX_THREADS):
    """
    Once the best hyperparameters are found using tune_hyperparameters(), call this function to train the model with the best hyperparameters found.

    Parameters
    ----------
    hp_dict: dict
        Contains the hyperparameters to be used for training and preprocessing.

    metric: str
        Target metric whose max or min value is to be found in the training process and returned. Will be used to find the best hyperparameters.

    metric_mode: str
        'max' or 'min' depending on whether the metric is to be maximised or minimised

    preprocess_again: bool
        If True, the data will be preprocessed again. If False, the data will be loaded from the preprocessed files.

    initial_lr: float
        Initial learning rate to be used for training. Can be scheduled to change during training using the reduce_lr_on_plateau callback in the pytorch_callbacks.py file.

    epochs: int
        Number of epochs to train for. Can step out of the training loop early if the early_stopping callback in the pytorch_callbacks.py file is triggered.

    Returns
    -------
    opt_result: float
        The best value of the metric found during training. This is the value that will be used to find the best hyperparameters.

    """
    def get_min_max_vale(history, key):
        min = 99999
        max = -99999
        for i in range(len(history)):
            if history[i][key] < min:
                min = history[i][key]
            if history[i][key] > max:
                max = history[i][key]

        return min, max

    print("\nTraining with hyperparameters: ")
    for key, value in hp_dict.items():
        print(f"{key}: {value}")

    # Train hyperparameters
    batch_size = hp_dict['batch_size']
    dropout_rate = hp_dict['dropout_rate']
    dense_units = hp_dict['dense_units']
    num_layers = hp_dict['num_layers']
    l1_l2_reg = hp_dict['l1_l2_reg']
    layers_batch_norm = bool(hp_dict['layers_batch_norm'])
    conv_model = hp_dict['conv_model']
    use_landmarks = bool(hp_dict['use_landmarks'])

    # Preprocess hyperparameters
    normalise = bool(hp_dict['normalise'])

    # Load saved preprocessed data
    X_landmark_depth, X_images, Y = data.load_preprocessed_data(normalise=normalise)

    # Split the data into train and test
    train_data, test_data = data.split_data(X_landmark_depth, X_images, Y)

    Xt_landmark_depth, Xt_images, Yt = test_data
    Xt_images = Xt_images.reshape(Xt_images.shape[0], Xt_images.shape[1], Xt_images.shape[2], 3)

    X_landmark_depth, X_images, Y = train_data
    X_images = X_images.reshape(X_images.shape[0], X_images.shape[1], X_images.shape[2], 3)

    input_shape_1 = utils.get_input_shape(which_input='image')
    input_shape_2 = utils.get_input_shape(which_input='landmarks_depths')

    class_weights = utils.get_class_weights(Y)
    class_weights = list(class_weights.values())
    print(f"Class weights: {class_weights}")

    # transpose the data to be in the format of (num_images, channels, height, width) from (num_images, height, width, channels)
    X_images = np.transpose(X_images, (0, 3, 1, 2))
    Xt_images = np.transpose(Xt_images, (0, 3, 1, 2))
    
    print(f"\n\ninput_shape_1: {input_shape_1}", f"input_shape_2: {input_shape_2}")
    print(f"X_images.shape: {X_images.shape}", f"X_landmark_depth.shape: {X_landmark_depth.shape}")
    print(f"Xt shape: {(Xt_images.shape, Xt_landmark_depth.shape)}, Yt shape: {Yt.shape}")

    # Convert the data to torch tensors
    X_images = torch.from_numpy(X_images).float()
    X_landmark_depth = torch.from_numpy(X_landmark_depth).float()
    Y = torch.from_numpy(Y)

    Xt = torch.from_numpy(Xt_images).float()
    Xt_landmark_depth = torch.from_numpy(Xt_landmark_depth).float()
    Yt = torch.from_numpy(Yt)

    # Set augmentation only if not using landmarks, as the landmarks are not augmented
    augmentation = None if use_landmarks else get_training_augmentation
    num_workers = 0 if use_landmarks else max_threads

    # Convert the data to torch datasets
    train_dataset = DataGenerator(X_images, X_landmark_depth, Y, augmentation)
    val_dataset = DataGenerator(Xt, Xt_landmark_depth, Yt, None)

    # Create the data loaders
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=num_workers)
    val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=batch_size, shuffle=True)

    # Create the model
    model = CustomModel(
        input_shapes=(input_shape_1, input_shape_2),
        class_weights=class_weights,
        dropout_rate=dropout_rate,
        dense_units=dense_units,
        num_layers=num_layers,
        l1_l2_reg=l1_l2_reg,
        layers_batch_norm=layers_batch_norm,
        conv_model_name=conv_model,
        use_landmarks=use_landmarks
    )

    # Train the model using torch
    history = pt_train.fit(
        epochs=epochs,
        lr=initial_lr,
        model=model,
        callbacks_function=get_callbacks,
        train_loader=train_loader,
        val_loader=val_loader
    )

    if metric and metric_mode:
        acc_min, acc_max = get_min_max_vale(history, metric)
        opt_result = acc_min if metric_mode == 'min' else acc_max

        # set to - if metric_mode is min, else set to +. This is for hyperopt to work
        opt_result = -opt_result if metric_mode == 'min' else opt_result
        print('his=0',len(history))
        
        return opt_result,history


def train_using_best_values(best_hp_json_save_path=BEST_HP_JSON_SAVE_PATH):
    """
    Train the model using the best hyperparameters found by hyperparameter optimisation

    Parameters
    ----------
    best_hp_json_save_path - path to the json file containing the best hyperparameters
    preprocess_again - whether to preprocess the data again or not

    """
    best_hyperparameters = utils.load_dict_from_json(best_hp_json_save_path)
    print(f"Best hyperparameters, {best_hyperparameters}")

    a,b=train(hp_dict=best_hyperparameters)
    print('b=>',b)
    return b


def plot_history(history, metric='loss'):
    """
    Plot the training and validation metrics across epochs.

    Parameters
    ----------
    history : list of dictionaries
        History of training containing metrics like loss, accuracy, etc.
    metric : str, optional
        Metric to plot, either 'loss' or 'accuracy'. Default is 'loss'.
    """
    train_metric = f"train_{metric}"
    val_metric = f"val_{metric}"

    epochs = range(1, len(history) + 1)
    train_values = [entry[train_metric] for entry in history]
    val_values = [entry[val_metric] for entry in history]

    plt.figure(figsize=(10, 5))
    plt.plot(epochs, [val * 100 for val in train_values], 'b', label=f'Training {metric}')
    plt.plot(epochs, [val * 100 for val in val_values], 'r', label=f'Validation {metric}')
    plt.title(f'Training and Validation {metric}')
    plt.xlabel('Epochs')
    plt.ylabel(metric.capitalize() + ' (%)')
    plt.legend()
    plt.grid(True)
    plt.show()

# Example usage:
# plot_history(history, metric='accuracy')


def hyper_parameter_optimise(
        search_space=TUNE_HP_RANGES,
        best_hp_json_save_path=BEST_HP_JSON_SAVE_PATH,
        tuner_csv_save_path=TUNER_CSV_SAVE_PATH,
        tuner_obj_save_path=TUNER_SAVE_PATH,
        tune_target=TUNE_TARGET,
        max_trials=MAX_TRIALS,
        load_if_exists=True,
):
    """
    Main function for hyperparameter optimisation using hyperopt

    Parameters
    ----------
    search_space: dict
        Example:
            tune_hp_ranges = {
                "dropout_rate": ([0.0, 0.3, 4], 'range')
                "conv_model": (["resnet18", "resnet101", "resnext50_32x4d"], 'choice'),
            }

    best_hp_json_save_path: str
        Path to the json file where the best hyperparameters will be saved

    tuner_csv_save_path: str
        Path to the csv file where the hyperparameter tuning results will be saved.
        A modified version of the csv file will be saved in the same directory for sorted results

    tuner_obj_save_path: str
        Path to the file where the hyperparameter tuning object will be saved

    tune_target: str
        The metric to be optimised. This is the metric that will be used to find the best hyperparameters

    max_trials: int
        The maximum number of trials to be run for hyperparameter optimisation

    load_if_exists: bool
        Whether to load the tuner object from the tuner_obj_save_path if it exists or not.

    """

    global tune_cnt, total_tune_cnt, start_time

    if load_if_exists:
        print(f"Loading existing tuner object from {tuner_obj_save_path}")
    else:
        print(f"Creating new tuner object")

    tuner_utils = pt_tuner.HyperTunerUtils(
        best_hp_json_save_path=best_hp_json_save_path,
        tuner_csv_save_path=tuner_csv_save_path,
        tuner_obj_save_path=tuner_obj_save_path,
        tune_target=tune_target,
        tune_hp_ranges=search_space,
        max_trials=max_trials,
        train_function=train,
        load_if_exists=load_if_exists,
    )

    tuner_utils.start_time = time.time()

    # Get the hp objects for each range in hyperopt
    search_space_hyperopt = tuner_utils.return_full_hp_dict(search_space)
    trials = Trials()

    best = fmin(
        tuner_utils.train_for_tuning,
        search_space_hyperopt,
        algo=tuner_utils.suggest_grid,
        max_evals=tuner_utils.max_trials,
        trials=trials,
        trials_save_file=tuner_utils.tuner_obj_save_path,
        verbose=True,
        show_progressbar=False
    )

    print("Best: ", best)
    print(space_eval(search_space_hyperopt, best))

    # Our pt_utils.hyper_tuner class will save the best hyperparameters to a json file after each trial
def get_training_augmentation(height, width):
    def _get_training_augmentation(height, width):
        train_transform = [
            albu.HorizontalFlip(p=0.5),
            albu.GaussNoise(var_limit=(10.0, 50.0), p=0.2),  
            albu.Rotate(limit=180, p=0.9),
            albu.OneOf(
                [
                    albu.CLAHE(p=1),
                    albu.RandomBrightnessContrast(p=1),
                    albu.RandomGamma(p=1),
                ],
                p=0.9,
            ),
            albu.OneOf(
                [
                    albu.Sharpen(alpha=(0.2, 0.5), lightness=(0.5, 1.0), always_apply=True),
                    albu.Blur(blur_limit=3, p=1),
                    albu.MotionBlur(blur_limit=3, p=1),
                ],
                p=0.9,
            ),
            albu.HueSaturationValue(p=1),  # Replace RandomContrast with HueSaturationValue
        ]
        return albu.Compose(train_transform)

    return _get_training_augmentation(height, width)





class DataGenerator(torch.utils.data.Dataset):
    """
    Simple data generator to load the data into the model
    """
    def __init__(self, X_images, X_landmark_depth, Y, image_augmentation=get_training_augmentation):
        self.X_images = X_images
        self.X_landmark_depth = X_landmark_depth
        self.Y = Y
        self.image_augmentation = None
        if image_augmentation:
            self.image_augmentation = image_augmentation(height=face_config.FACE_SIZE, width=face_config.FACE_SIZE)
            print("Image augmentation enabled (face_emotions_model.py)")
        else:
            print("Image augmentation disabled (face_emotions_model.py)")

    def __len__(self):
        return len(self.X_images)

    def __getitem__(self, index):
        X_image = self.X_images[index]

        if self.image_augmentation:
            # below implementation is not very efficient. Will be improved in the future. Doesn't affect training speed much when using multiple workers.

            X_image = self.convert_tensor_to_numpy(X_image)
            X_image = X_image * 255.
            X_image = X_image.astype(np.uint8)
            X_image = self.image_augmentation(image=X_image)['image']

            X_image = X_image / 255.
            X_image = self.convert_numpy_to_tensor(X_image)

        X_landmark_depth = self.X_landmark_depth[index]
        Y = self.Y[index]

        return X_image, X_landmark_depth, Y

    def convert_tensor_to_numpy(self, tensor):
        img = tensor.detach().cpu().numpy()
        img = np.transpose(img, (1, 2, 0))

        return img

    def convert_numpy_to_tensor(self, numpy_array):
        numpy_array = np.transpose(numpy_array, (2, 0, 1))
        img = torch.from_numpy(numpy_array).to(device).type(torch.FloatTensor)

        return img


if __name__ == '__main__':
    # train_using_best_values()
    hyper_parameter_optimise()





   