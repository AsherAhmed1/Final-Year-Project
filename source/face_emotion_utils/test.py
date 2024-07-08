import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score
import sys
import time
import traceback
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import roc_curve, auc

import cv2
from matplotlib import pyplot as plt
import seaborn as sns
import source.face_emotion_utils.preprocess_main as data
import source.face_emotion_utils.utils as utils
import source.face_emotion_utils.face_config as face_config
import source.config as config
import source.audio_analysis_utils.utils as audio_utils

import source.pytorch_utils.callbacks as pt_callbacks
import source.pytorch_utils.training_utils as pt_train
import source.pytorch_utils.hyper_tuner as pt_tuner

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision.models import *
from tqdm import tqdm
import csv
import os

from hyperopt import hp, STATUS_OK, fmin, tpe, space_eval, Trials, rand
import albumentations as albu
from source.face_emotion_utils import utils as face_utils
from source.face_emotion_utils import predict as predict
import source.config as config

device = config.device
emotion_index_dict = config.EMOTION_INDEX

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
            # Implementation for image augmentation
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
def test_model_accuracy(model, normalise, best_hyperparameters_path, batch_size=64):
    verbose = True
    L, I, Y = data.load_preprocessed_test_data(normalise=normalise)

    Y = audio_utils.simply_emotion_softmax_list(Y)
    if len(Y.shape) > 1:
        Y = np.argmax(Y, axis=1)
    I = np.stack((I,) * 3, axis=-1)
    I = I.reshape(I.shape[0], I.shape[1], I.shape[2], 3)
    I = np.transpose(I, (0, 3, 1, 2))
    I = torch.from_numpy(I).float()
    L = torch.from_numpy(L).float()
    Y = torch.from_numpy(Y)
    model_input = (I,L)
    augmentation = None if L.size == 0 else get_training_augmentation
    num_workers = 0 if L.size == 0 else config.MAX_THREADS
    train_dataset = DataGenerator(I, L, Y, augmentation)
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=num_workers)

    print("size:", L.size)

    # Calculate total number of batches
    total_batches = len(I) // batch_size + int(len(I) % batch_size > 0)
    predicted_labels = []
    predicted_probabilities = []

    for batch_start in tqdm(range(0, len(I), batch_size), desc="Testing", total=total_batches):
        batch_end = min(batch_start + batch_size,len(I)) 

        pred = model(
            torch.from_numpy(np.array(model_input[0][batch_start:batch_end])).float().to(device),
            torch.from_numpy(np.array(model_input[1][batch_start:batch_end])).float().to(device)
        )
        pred = torch.nn.functional.softmax(pred, dim=1)

        raw_output = pred.detach().cpu().numpy()
        predicted_probabilities.append(raw_output)
        predicted_labels.append(np.argmax(raw_output, axis=1))

    predicted_labels = np.concatenate(predicted_labels)
    predicted_probabilities = np.concatenate(predicted_probabilities)

    # Calculate accuracy
    accuracy = accuracy_score(Y, predicted_labels)
    print(f"Accuracy: {accuracy * 100:.2f}%")
    motion_labels = ['Sad/Fear', 'Neutral', 'Happy', 'Angry', 'Surprise/Disgust']

    # Calculate precision and recall
    precision = precision_score(Y, predicted_labels, average=None)
    recall = recall_score(Y, predicted_labels, average=None)

    # Compute confusion matrix
    conf_matrix = confusion_matrix(Y, predicted_labels)

    # Define labels for the confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=motion_labels, yticklabels=motion_labels)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.show()

    # Plot ROC curve and calculate AUC for each emotion class
    plt.figure(figsize=(8, 6))
    for emotion_class in range(len(motion_labels)):
        fpr, tpr, thresholds = roc_curve(Y == emotion_class, predicted_probabilities[:, emotion_class])
        roc_auc = auc(fpr, tpr)
        plt.plot(fpr, tpr, label=f'{motion_labels[emotion_class]} (AUC = {roc_auc:.2f})')

    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc="lower right")
    plt.show()

    # Calculate precision and recall matrices
    precision_matrix = np.zeros((len(motion_labels), len(motion_labels)))
    recall_matrix = np.zeros((len(motion_labels), len(motion_labels)))
    for true_label in range(len(motion_labels)):
        for pred_label in range(len(motion_labels)):
            true_mask = (Y == true_label)
            pred_mask = (predicted_labels == pred_label)
            precision_matrix[true_label, pred_label] = precision_score(true_mask, pred_mask)
            recall_matrix[true_label, pred_label] = recall_score(true_mask, pred_mask)

    # Plot precision matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(precision_matrix, annot=True, fmt=".2f", cmap="Blues", xticklabels=motion_labels, yticklabels=motion_labels)
    plt.title('Precision Matrix')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.show()

    # Plot recall matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(recall_matrix, annot=True, fmt=".2f", cmap="Blues", xticklabels=motion_labels, yticklabels=motion_labels)
    plt.title('Recall Matrix')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.show()

# Example usage:
# test_model_accuracy(model, normalise, best_hyperparameters_path, batch_size=64)
