# # backend/app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# def detect_emotion(frame):
#     # Placeholder for you r emotion detection logic
#     print(frame)
#     return "happy"

# def transcribe_audio(audio_data):
#     # Placeholder for your audio transcription logic
#     return "Hello, world!"

# def detect_audio_emotion(transcription):
#     # Placeholder for your audio emotion detection logic
#     return "neutral"

# @app.route('/emotion-detection', methods=['POST'])
# def emotion_detection():
#     if 'frame' in request.files:
#         file = request.files['frame']
#         np_img = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
#         emotion = detect_emotion(img)
#         return jsonify({'emotion': emotion})
#     return jsonify({'error': 'No frame received'}), 400

# @app.route('/audio-transcription', methods=['POST'])
# def audio_transcription():
#     if 'audio' in request.files:
#         audio_file = request.files['audio']
#         audio_data = audio_file.read()
#         transcription = transcribe_audio(audio_data)
#         emotion = detect_audio_emotion(transcription)
#         return jsonify({'transcription': transcription, 'emotion': emotion})
#     return jsonify({'error': 'No audio received'}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)


#--------------------------------------------------------------------------------------------

# # backend/app.py
#_______________________________________________working gooood _______________#
import sys
import os
import gc
import threading
import time
import nltk
import speech_recognition as sr
import torch
import cv2
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from summarizer import Summarizer

import source.face_emotion_utils.predict as video_emotion_detection
import source.face_emotion_utils.utils as face_utilities
import source.config as config

# Download necessary NLTK data
nltk.download('punkt')

app = Flask(__name__)
CORS(app)

stop_recording = False
transcription_thread = None
transcription_lock = threading.Lock()

def convert_float32(data):
    if isinstance(data, np.float32):
        return float(data)
    elif isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, dict):
        return {key: convert_float32(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_float32(element) for element in data]
    elif isinstance(data, tuple):
        return tuple(convert_float32(element) for element in data)
    else:
        return data

def detect_emotion(frame):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    face_model_path = config.FACE_MODEL_SAVE_PATH
    best_hyperparameters_path = config.FACE_BEST_HP_JSON_SAVE_PATH

    best_hyperparameters = face_utilities.load_dict_from_json(best_hyperparameters_path)
    model = torch.load(face_model_path)
    model.to(device).eval()

    return_obj = video_emotion_detection._get_prediction(best_hp=best_hyperparameters,
                                                         img=frame,
                                                         model=model,
                                                         imshow=True,
                                                         video_mode=True,
                                                         verbose=True,
                                                         grad_cam=False,
                                                         grad_cam_on_video=False,
                                                         feature_maps_flag=False)
    return convert_float32(return_obj)

def summarize_text_with_sumy(text):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, 2)  # Summarize to 2 sentences
    return " ".join([str(sentence) for sentence in summary])

def transcribe_audio():
    global stop_recording
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        print("Please say something...")

        recording = []

        while not stop_recording:
            audio_chunk = recognizer.listen(source)
            recording.append(audio_chunk)
            print("Recording... Press 'q' to stop.")

        print("Processing now...")

        frames = [chunk.frame_data for chunk in recording]
        audio = b"".join(frames)
        sample_rate = recording[0].sample_rate
        sample_width = recording[0].sample_width
        audio = sr.AudioData(audio, sample_rate=sample_rate, sample_width=sample_width)

        try:
            text = recognizer.recognize_google(audio)
            print("Audio transcribed successfully.")
        except sr.UnknownValueError:
            print("Sorry, I could not understand audio.")
            return ""
        except sr.RequestError as e:
            print(f"Error: Could not request results; {e}")
            return ""

    sentences = sent_tokenize(text)
    with open("trans_text.txt", "w") as file:
        file.write(text)
    # model = Summarizer()
    summary = summarize_text_with_sumy(text)


    with open("summarized_text.txt", "w") as file:
        file.write(summary)

    print("Summarized text saved to 'summarized_text.txt'")
    return text

def detect_audio_emotion(transcription):
    return "neutral"

@app.route('/emotion-detection', methods=['POST'])
def emotion_detection():
    if 'frame' in request.files:
        file = request.files['frame']
        np_img = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        emotion = detect_emotion(img)
        print("Emotion object type:", type(emotion))

        del np_img
        del img
        gc.collect()
        return jsonify({'emotion': emotion})
    return jsonify({'error': 'No frame received'}), 400

@app.route('/start-transcription', methods=['POST'])
def start_transcription():
    global transcription_thread, stop_recording

    stop_recording = False
    if transcription_thread is None or not transcription_thread.is_alive():
        transcription_thread = threading.Thread(target=transcribe_audio)
        transcription_thread.start()
        return jsonify({'status': 'Transcription started'})
    else:
        return jsonify({'status': 'Transcription already running'})

@app.route('/stop-transcription', methods=['POST'])
def stop_transcription():
    global stop_recording

    stop_recording = True
    if transcription_thread is not None:
        transcription_thread.join()
    return jsonify({'status': 'Transcription stopped'})

@app.route('/audio-transcription', methods=['POST'])
def audio_transcription():
    transcription = transcribe_audio()
    emotion = detect_audio_emotion(transcription)
    return jsonify({'transcription': transcription, 'emotion': emotion})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



# end goood ---------------------------------------------------------------------------------------------------------



# import sys
# import os
# import gc
# stop_recording = False
# import nltk
# nltk.download('punkt')
# import speech_recognition as sr
# import time
# import threading
# from nltk.tokenize import sent_tokenize
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lsa import LsaSummarizer
# from summarizer import Summarizer
# import torch
# import io
# from pydub import AudioSegment
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import source.face_emotion_utils.predict as video_emotion_detection
# import source.face_emotion_utils.utils as face_utilities
# import source.config as config

# app = Flask(__name__)
# CORS(app)

# def convert_float32(data):
#     if isinstance(data, np.float32):
#         return float(data)
#     elif isinstance(data, np.ndarray):
#         return data.tolist()
#     elif isinstance(data, dict):
#         return {key: convert_float32(value) for key, value in data.items()}
#     elif isinstance(data, list):
#         return [convert_float32(element) for element in data]
#     elif isinstance(data, tuple):
#         return tuple(convert_float32(element) for element in data)
#     else:
#         return data

# def detect_emotion(frame):
#     device = 'cuda' if torch.cuda.is_available() else 'cpu'
#     face_model_path = config.FACE_MODEL_SAVE_PATH
#     best_hyperparameters_path = config.FACE_BEST_HP_JSON_SAVE_PATH

#     best_hyperparameters = face_utilities.load_dict_from_json(best_hyperparameters_path)
#     model = torch.load(face_model_path)
#     model.to(device).eval()

#     return_obj = video_emotion_detection._get_prediction(best_hp=best_hyperparameters,
#                         img=frame,
#                         model=model,
#                         imshow=True,
#                         video_mode=True,
#                         verbose=True,
#                         grad_cam=True,
#                         grad_cam_on_video=False,
#                         feature_maps_flag=False)
#     return convert_float32(return_obj)

# def transcribe_audio(audio_data):
#     recognizer = sr.Recognizer()
    
#     try:
#         audio = AudioSegment.from_file(audio_data)
#         audio_chunks = sr.AudioFile(io.BytesIO(audio.raw_data))
#     except Exception as e:
#         print(f"Error processing audio file: {e}")
#         return "Error processing audio file."

#     with audio_chunks as source:
#         recognizer.adjust_for_ambient_noise(source)
#         audio_content = recognizer.record(source)
    
#     try:
#         text = recognizer.recognize_google(audio_content)
#         print("Audio transcribed successfully.")
#     except sr.UnknownValueError:
#         return "Sorry, I could not understand audio."
#     except sr.RequestError as e:
#         return f"Error: Could not request results; {e}"

#     model = Summarizer()
#     summary = model(text, ratio=0.2)
    
#     return summary

# def detect_audio_emotion(transcription):
#     return "neutral"  # Placeholder for your audio emotion detection logic

# @app.route('/emotion-detection', methods=['POST'])
# def emotion_detection():
#     if 'frame' in request.files:
#         file = request.files['frame']
#         np_img = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
#         emotion = detect_emotion(img)
#         print("Emotion object type:", type(emotion))

#         del np_img
#         del img
#         gc.collect()  # Perform garbage collection
#         return jsonify({'emotion': emotion})
#     return jsonify({'error': 'No frame received'}), 400

# @app.route('/audio-transcription', methods=['POST'])
# def audio_transcription():
#     if 'audio' not in request.files:
#         app.logger.error("No audio file provided in request")
#         return 'No  audio'
#         return jsonify({"error": "No audio file provided"}), 400

#     audio_file = request.files['audio']
#     audio_data = io.BytesIO(audio_file.read())
    
#     try:
#         transcription = transcribe_audio(audio_data)
#         emotion = detect_audio_emotion(transcription)
#         return 'Hello'
#         # return jsonify({'transcription': transcription, 'emotion': emotion})
#     except Exception as e:
#         app.logger.error(f"Error in processing audio: {e}")
#         # return jsonify({"error": "Error in processing audio"}), 500
#         return 'Error'


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
