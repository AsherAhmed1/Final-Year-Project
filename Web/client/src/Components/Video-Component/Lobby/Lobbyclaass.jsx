"use strict";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { CiMicrophoneOn, CiMicrophoneOff, CiVideoOn, CiVideoOff } from "react-icons/ci";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../../../App.css'; // Import the CSS file for styling

const SIGNALING_SERVER_URL = 'ws://localhost:8080';
let signalingServer;
let peerConnection;

const App = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [transcription, setTranscription] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isEndingCall, setIsEndingCall] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    signalingServer = new WebSocket(SIGNALING_SERVER_URL);

    signalingServer.onopen = () => {
      console.log('WebSocket connected');
    };

    signalingServer.onmessage = handleSignalingData;

    signalingServer.onclose = (event) => {
      console.error('WebSocket closed unexpectedly:', event);
    };

    signalingServer.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    startLocalStream();

    return () => {
      signalingServer.close();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(captureFrame, 1000);
    return () => clearInterval(interval);
  }, [remoteVideoRef]);

  const sendSignalingMessage = (message) => {
    if (signalingServer.readyState === WebSocket.OPEN) {
      signalingServer.send(message);
    } else {
      console.warn('WebSocket not open, queueing message:', message);
    }
  };

  const handleSignalingData = (message) => {
    try {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'offer':
          handleOffer(data.offer);
          break;
        case 'answer':
          handleAnswer(data.answer);
          break;
        case 'candidate':
          handleCandidate(data.candidate);
          break;
        default:
          console.log('Unhandled message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing signaling message:', error);
    }
  };

  const startLocalStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        peerConnection = createPeerConnection();
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        peerConnection.createOffer()
          .then((offer) => {
            peerConnection.setLocalDescription(offer);
            sendSignalingMessage(JSON.stringify({ type: 'offer', offer: offer }));
          })
          .catch(error => {
            console.error('Error creating offer:', error);
          });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        alert("Error accessing media devices. Please ensure you have granted permission.");
      });
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection();

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignalingMessage(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current.srcObject !== event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  const handleOffer = (offer) => {
    peerConnection = createPeerConnection();
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        peerConnection.createAnswer()
          .then((answer) => {
            peerConnection.setLocalDescription(answer);
            sendSignalingMessage(JSON.stringify({ type: 'answer', answer: answer }));
          })
          .catch(error => {
            console.error('Error creating answer:', error);
          });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  const handleAnswer = (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.addIceCandidate(iceCandidate);
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !isMicOn;
      setIsMicOn(!isMicOn);

      if (isMicOn) {
        stopAudioRecording();
      } else {
        startAudioRecording();
      }
    }
  };

  const startAudioRecording = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    const source = audioContext.createMediaStreamSource(localStream);

    const mediaRecorder = new MediaRecorder(localStream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        sendAudioToBackend(event.data);
      }
    };

    mediaRecorder.start(1000); // Capture audio every second
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const sendAudioToBackend = (audioBlob) => {
    console.log("Sending audio data to backend...");
    const formData = new FormData();
    formData.append('audio', audioBlob);

    axios.post('http://127.0.0.1:5000/audio-transcription', formData)
      .then(response => {
        console.log("Received response from backend:", response.data);
        setTranscription(response.data.transcription);
        setEmotion(response.data.emotion);
      })
      .catch(error => {
        console.error("Error sending audio to backend", error);
      });
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !isVideoOn;
      setIsVideoOn(!isVideoOn);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }
    setIsEndingCall(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  const captureFrame = () => {
    const canvas = canvasRef.current;
    if (!remoteVideoRef.current || !canvas) return;

    const context = canvas.getContext('2d');
    const video = remoteVideoRef.current;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      sendFrameToBackend(blob);
    }, 'image/jpeg');
  };

  const sendFrameToBackend = (frame) => {
    console.log("Sending frame data to backend...");
    const formData = new FormData();
    formData.append('frame', frame);

    axios.post('http://127.0.0.1:5000/emotion-detection', formData)
      .then(response => {
        console.log("Received response from backend:", response.data);
        setEmotion(response.data.emotion);
      })
      .catch(error => {
        console.error("Error sending frame to backend", error);
      });
  };

  return (
    <div className="relative h-screen bg-gray-900 flex justify-center items-center">
      <div className="flex flex-col items-center p-8 relative w-full h-full">
        {isEndingCall && (
          <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
            Ending call...
          </div>
        )}
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute bottom-24 right-20">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-32 h-32 object-cover"
          ></video>
        </div>
        <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
      </div>
      <button
        onClick={toggleMic}
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-700 p-4 rounded-full"
      >
        {isMicOn ? <CiMicrophoneOn size={32} /> : <CiMicrophoneOff size={32} />}
      </button>
      <button
        onClick={toggleVideo}
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-700 p-4 rounded-full ml-16"
      >
        {isVideoOn ? <CiVideoOn size={32} /> : <CiVideoOff size={32} />}
      </button>
      <button
        onClick={endCall}
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-red-700 p-4 rounded-full ml-32"
      >
        <MdCallEnd size={32} />
      </button>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-700 p-4 rounded-lg text-white text-center">
        <p className="text-lg">{emotion}</p>
        <p className="text-sm">{transcription}</p>
      </div>
    </div>
  );
};

export default App;

