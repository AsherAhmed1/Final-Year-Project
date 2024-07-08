// import React, { useState, useRef, useEffect } from "react";
// import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
// import { CiVideoOn, CiVideoOff } from "react-icons/ci";
// import { MdCallEnd } from "react-icons/md";
// import { useNavigate } from "react-router-dom"; // Make sure to install react-router-dom

// const App = () => {
//   const localVideoRef = useRef(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [audioVolume, setAudioVolume] = useState(0);
//   const remoteVideoRef = useRef(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isVideoPaused, setIsVideoPaused] = useState(false); // State to track if video is paused
//   const [isEndingCall, setIsEndingCall] = useState(false); // State to manage ending call message
//   const navigate = useNavigate(); // Initialize the navigate function

//   useEffect(() => {
//     startLocalStream();
//   }, []);

//   const startLocalStream = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const source = audioContext.createMediaStreamSource(stream);
//         source.connect(analyser);

//         // Configure the analyser
//         analyser.fftSize = 64;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         // Start capturing audio data
//         const updateAudioVolume = () => {
//           analyser.getByteFrequencyData(dataArray);
//           const sum = dataArray.reduce((acc, cur) => acc + cur, 0);
//           const average = sum / bufferLength;
//           setAudioVolume(average);
//           requestAnimationFrame(updateAudioVolume);
//         };
//         updateAudioVolume();
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   useEffect(() => {
//     // Check if video is paused
//     setIsVideoPaused(!isVideoOn);
//   }, [isVideoOn]);

//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks()[0].enabled = !isMicOn;
//       setIsMicOn(!isMicOn);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         // Toggle the enabled state of the video track
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoOn(videoTrack.enabled);
//       } else {
//         // If no video track exists, getUserMedia to get a new stream with video
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then((newStream) => {
//             const newVideoTrack = newStream.getVideoTracks()[0];
//             // Add the new video track to the existing stream
//             setLocalStream(
//               new MediaStream([...localStream.getAudioTracks(), newVideoTrack])
//             );
//             setIsVideoOn(true);
//           })
//           .catch((error) => {
//             console.error("Error accessing media devices.", error);
//           });
//       }
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       // Stop all tracks in the local stream
//       localStream.getTracks().forEach((track) => track.stop());
//       // Set local stream to null
//       setLocalStream(null);
//     }
//     if (remoteStream) {
//       // Stop all tracks in the remote stream
//       remoteStream.getTracks().forEach((track) => track.stop());
//       // Set remote stream to null
//       setRemoteStream(null);
//     }
//     setIsEndingCall(true); // Show "Ending call" message
//     setTimeout(() => {
//       // Redirect to dashboard after 5 seconds
//       navigate("/dashboard");
//     }, 5000);
//   };

//   const AudioCaptureBar = () => {
//     const barHeight = `${audioVolume}px`;
//     return (
//       <div
//         className="absolute top-0 right-0 h-full bg-green-500 w-4"
//         style={{ height: barHeight }}
//       ></div>
//     );
//   };

//   return (
//     <div className="relative h-screen bg-gray-900 flex justify-left items-center">
//       <div className="flex flex-row justify-center items-center p-8 relative">
//         {isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Ending call...
//           </div>
//         )}
//         {isVideoPaused && !isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Video is paused
//           </div>
//         )}
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           className="w-full h-full object-cover"
//         ></video>
//         <div>
//           {/* <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-32 h-32 object-cover ml-10 mb-80"
//           ></video> */}
//         </div>
//       </div>
//       {isMicOn && <AudioCaptureBar />}{" "}
//       {/* Conditionally render the AudioCaptureBar component */}
//       <button
//         onClick={toggleMic}
//         className="absolute bottom-14 left-52 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleVideo}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//         style={{ left: "21.5rem" }}
//       >
//         {isVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={endCall}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
//         style={{ left: "30rem" }}
//       >
//         <MdCallEnd />
//       </button>
//     </div>
//   );
// };

// export default App;


//---------------------------------------------------------------------------------------------------------




// import React, { useState, useRef, useEffect } from "react";
// import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
// import { CiVideoOn, CiVideoOff } from "react-icons/ci";
// import { MdCallEnd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// const App = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null); // Added remote stream state
//   const [isLocalMicOn, setIsLocalMicOn] = useState(true);
//   const [isRemoteMicOn, setIsRemoteMicOn] = useState(true); // Separate state for remote mic
//   const [localAudioVolume, setLocalAudioVolume] = useState(0);
//   const [remoteAudioVolume, setRemoteAudioVolume] = useState(0); // Separate state for remote audio volume
//   const [isLocalVideoOn, setIsLocalVideoOn] = useState(true);
//   const [isRemoteVideoOn, setIsRemoteVideoOn] = useState(true); // Separate state for remote video
//   const [isEndingCall, setIsEndingCall] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     startLocalStream();
//     startRemoteStream(); // Call remote stream function
//   }, []);

//   const startLocalStream = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const source = audioContext.createMediaStreamSource(stream);
//         source.connect(analyser);

//         analyser.fftSize = 64;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         const updateAudioVolume = () => {
//           analyser.getByteFrequencyData(dataArray);
//           const sum = dataArray.reduce((acc, cur) => acc + cur, 0);
//           const average = sum / bufferLength;
//           setLocalAudioVolume(average);
//           requestAnimationFrame(updateAudioVolume);
//         };
//         updateAudioVolume();
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const startRemoteStream = () => {
//     // Simulate fetching remote stream
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         remoteVideoRef.current.srcObject = stream;
//         setRemoteStream(stream);

//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const source = audioContext.createMediaStreamSource(stream);
//         source.connect(analyser);

//         analyser.fftSize = 64;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         const updateAudioVolume = () => {
//           analyser.getByteFrequencyData(dataArray);
//           const sum = dataArray.reduce((acc, cur) => acc + cur, 0);
//           const average = sum / bufferLength;
//           setRemoteAudioVolume(average);
//           requestAnimationFrame(updateAudioVolume);
//         };
//         updateAudioVolume();
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const toggleLocalMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks()[0].enabled = !isLocalMicOn;
//       setIsLocalMicOn(!isLocalMicOn);
//     }
//   };

//   const toggleRemoteMic = () => {
//     if (remoteStream) {
//       remoteStream.getAudioTracks()[0].enabled = !isRemoteMicOn;
//       setIsRemoteMicOn(!isRemoteMicOn);
//     }
//   };

//   const toggleLocalVideo = () => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsLocalVideoOn(videoTrack.enabled);
//       } else {
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then((newStream) => {
//             const newVideoTrack = newStream.getVideoTracks()[0];
//             setLocalStream(
//               new MediaStream([...localStream.getAudioTracks(), newVideoTrack])
//             );
//             setIsLocalVideoOn(true);
//           })
//           .catch((error) => {
//             console.error("Error accessing media devices.", error);
//           });
//       }
//     }
//   };

//   const toggleRemoteVideo = () => {
//     if (remoteStream) {
//       const videoTrack = remoteStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsRemoteVideoOn(videoTrack.enabled);
//       } else {
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then((newStream) => {
//             const newVideoTrack = newStream.getVideoTracks()[0];
//             setRemoteStream(
//               new MediaStream([...remoteStream.getAudioTracks(), newVideoTrack])
//             );
//             setIsRemoteVideoOn(true);
//           })
//           .catch((error) => {
//             console.error("Error accessing media devices.", error);
//           });
//       }
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//       setLocalStream(null);
//     }
//     if (remoteStream) {
//       remoteStream.getTracks().forEach((track) => track.stop());
//       setRemoteStream(null);
//     }
//     setIsEndingCall(true);
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 5000);
//   };

//   const AudioCaptureBar = ({ volume }) => {
//     const barHeight = `${volume}px`;
//     return (
//       <div
//         className="absolute top-0 right-0 h-full bg-green-500 w-4"
//         style={{ height: barHeight }}
//       ></div>
//     );
//   };

//   return (
//     <div className="relative h-screen bg-gray-900 flex justify-center items-center">
//       <div className="flex flex-col items-center p-8 relative w-full h-full">
//         {isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Ending call...
//           </div>
//         )}
//         {!isLocalVideoOn && !isEndingCall && (
//           <div className="absolute bottom-24 right-20 w-32 h-32 bg-black flex justify-center items-center text-white text-xl">
//             Local video is paused
//           </div>
//         )}
//         {!isRemoteVideoOn && !isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Remote video is paused
//           </div>
//         )}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           muted
//           className="w-full h-full object-cover"
//         ></video>
//         <div className="absolute bottom-24 right-20">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-32 h-32 object-cover"
//           ></video>
//         </div>
//       </div>
//       {isLocalMicOn && <AudioCaptureBar volume={localAudioVolume} />}
//       {isRemoteMicOn && <AudioCaptureBar volume={remoteAudioVolume} />}
//       <button
//         onClick={toggleLocalMic}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//         style={{ left: "30rem" }}
//       >
//         {isLocalMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleRemoteMic}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//         style={{ left: "35rem" }}
//       >
//         {isRemoteMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleLocalVideo}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//         style={{ left: "40rem" }}
//       >
//         {isLocalVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={toggleRemoteVideo}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//         style={{ left: "45rem" }}
//       >
//         {isRemoteVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={endCall}
//         className="absolute bottom-14 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
//         style={{ left: "50rem" }}
//       >
//         <MdCallEnd />
//       </button>
//     </div>
//   );
// };

// export default App;




//---------------------------------------------------------------------------------------------------------




// src/components/App.js

// import React, { useState, useRef, useEffect } from "react";
// import { CiMicrophoneOn, CiMicrophoneOff, CiVideoOn, CiVideoOff } from "react-icons/ci";
// import { MdCallEnd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import '../../../App.css'; // Import the CSS file for styling

// const SIGNALING_SERVER_URL = 'ws://localhost:8080';
// let peerConnection;
// let signalingServer;

// const App = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isEndingCall, setIsEndingCall] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     signalingServer = new WebSocket(SIGNALING_SERVER_URL);
//     signalingServer.onmessage = handleSignalingData;

//     startLocalStream();

//     return () => {
//       signalingServer.close();
//     };
//   }, []);

//   const handleSignalingData = (message) => {
//     const data = JSON.parse(message.data);

//     switch (data.type) {
//       case 'offer':
//         handleOffer(data.offer);
//         break;
//       case 'answer':
//         handleAnswer(data.answer);
//         break;
//       case 'candidate':
//         handleCandidate(data.candidate);
//         break;
//       default:
//         break;
//     }
//   };

//   const startLocalStream = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         peerConnection = new RTCPeerConnection();
//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.onicecandidate = (event) => {
//           if (event.candidate) {
//             signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//           }
//         };

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current.srcObject !== event.streams[0]) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         peerConnection.createOffer()
//           .then((offer) => {
//             peerConnection.setLocalDescription(offer);
//             signalingServer.send(JSON.stringify({ type: 'offer', offer: offer }));
//           });
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const handleOffer = (offer) => {
//     peerConnection = new RTCPeerConnection();
//     peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.createAnswer()
//           .then((answer) => {
//             peerConnection.setLocalDescription(answer);
//             signalingServer.send(JSON.stringify({ type: 'answer', answer: answer }));
//           });

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current.srcObject !== event.streams[0]) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         peerConnection.onicecandidate = (event) => {
//           if (event.candidate) {
//             signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//           }
//         };
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const handleAnswer = (answer) => {
//     peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleCandidate = (candidate) => {
//     const iceCandidate = new RTCIceCandidate(candidate);
//     peerConnection.addIceCandidate(iceCandidate);
//   };

//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks()[0].enabled = !isMicOn;
//       setIsMicOn(!isMicOn);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks()[0].enabled = !isVideoOn;
//       setIsVideoOn(!isVideoOn);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection) {
//       peerConnection.close();
//       peerConnection = null;
//     }
//     setIsEndingCall(true);
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 5000);
//   };

//   return (
//     <div className="relative h-screen bg-gray-900 flex justify-center items-center">
//       <div className="flex flex-col items-center p-8 relative w-full h-full">
//         {isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Ending call...
//           </div>
//         )}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="w-full h-full object-cover"
//         ></video>
//         <div className="absolute bottom-24 right-20">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-32 h-32 object-cover"
//           ></video>
//         </div>
//       </div>
//       <button
//         onClick={toggleMic}
//         className="absolute bottom-14 left-24 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleVideo}
//         className="absolute bottom-14 left-48 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={endCall}
//         className="absolute bottom-14 left-72 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
//       >
//         <MdCallEnd />
//       </button>
//     </div>
//   );
// };

// export default App;




//------------------------------------------------------------------------------------------------------------



// import React, { useState, useRef, useEffect } from "react";
// import { CiMicrophoneOn, CiMicrophoneOff, CiVideoOn, CiVideoOff } from "react-icons/ci";
// import { MdCallEnd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import '../../../App.css'; // Import the CSS file for styling

// const SIGNALING_SERVER_URL = 'ws://localhost:8080';
// let peerConnection;
// let signalingServer;

// const App = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isEndingCall, setIsEndingCall] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     signalingServer = new WebSocket(SIGNALING_SERVER_URL);
//     signalingServer.onmessage = handleSignalingData;

//     startLocalStream();

//     return () => {
//       signalingServer.close();
//     };
//   }, []);

//   const handleSignalingData = (message) => {
//     const data = JSON.parse(message.data);

//     switch (data.type) {
//       case 'offer':
//         handleOffer(data.offer);
//         break;
//       case 'answer':
//         handleAnswer(data.answer);
//         break;
//       case 'candidate':
//         handleCandidate(data.candidate);
//         break;
//       default:
//         break;
//     }
//   };

//   const startLocalStream = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         peerConnection = new RTCPeerConnection();
//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.onicecandidate = (event) => {
//           if (event.candidate) {
//             signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//           }
//         };

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current.srcObject !== event.streams[0]) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         peerConnection.createOffer()
//           .then((offer) => {
//             peerConnection.setLocalDescription(offer);
//             signalingServer.send(JSON.stringify({ type: 'offer', offer: offer }));
//           });
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const handleOffer = (offer) => {
//     peerConnection = new RTCPeerConnection();
//     peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.createAnswer()
//           .then((answer) => {
//             peerConnection.setLocalDescription(answer);
//             signalingServer.send(JSON.stringify({ type: 'answer', answer: answer }));
//           });

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current.srcObject !== event.streams[0]) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         peerConnection.onicecandidate = (event) => {
//           if (event.candidate) {
//             signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//           }
//         };
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const handleAnswer = (answer) => {
//     peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleCandidate = (candidate) => {
//     const iceCandidate = new RTCIceCandidate(candidate);
//     peerConnection.addIceCandidate(iceCandidate);
//   };

//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks()[0].enabled = !isMicOn;
//       setIsMicOn(!isMicOn);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks()[0].enabled = !isVideoOn;
//       setIsVideoOn(!isVideoOn);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection) {
//       peerConnection.close();
//       peerConnection = null;
//     }
//     setIsEndingCall(true);
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 5000);
//   };

//   return (
//     <div className="relative h-screen bg-gray-900 flex justify-center items-center">
//       <div className="flex flex-col items-center p-8 relative w-full h-full">
//         {isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Ending call...
//           </div>
//         )}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="w-full h-full object-cover"
//         ></video>
//         <div className="absolute bottom-24 right-20">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-32 h-32 object-cover"
//           ></video>
//         </div>
//       </div>
//       <button
//         onClick={toggleMic}
//         className="absolute bottom-14 left-24 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleVideo}
//         className="absolute bottom-14 left-48 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={endCall}
//         className="absolute bottom-14 left-72 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
//       >
//         <MdCallEnd />
//       </button>
//     </div>
//   );
// };

// export default App;


//----------------------------------------------------------------------------------------------------------

// this is running fine without any errors
// "use strict"
// import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios';

// import { CiMicrophoneOn, CiMicrophoneOff, CiVideoOn, CiVideoOff } from "react-icons/ci";
// import { MdCallEnd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import '../../../App.css'; // Import the CSS file for styling

// const SIGNALING_SERVER_URL = 'ws://localhost:8080';
// let peerConnection;
// let signalingServer;
// let messageQueue = [];

// const App = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const canvasRef = useRef(null); // Added canvasRef
//   const [emotion, setEmotion] = useState(''); // Added emotion state
//   const [transcription, setTranscription] = useState(''); // Added transcription state
//   const [localStream, setLocalStream] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isEndingCall, setIsEndingCall] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
  
//     signalingServer = new WebSocket(SIGNALING_SERVER_URL);
    
//     signalingServer.onopen = () => {
//       // Send any queued messages
//       while (messageQueue.length > 0) {
//         signalingServer.send(messageQueue.shift());
//       }
//     };
//     captureFrame();
//     signalingServer.onmessage = handleSignalingData;

//     startLocalStream();

//     return () => {
//       signalingServer.close();
//     };
//   }, []);

//   const sendSignalingMessage = (message) => {
//     if (signalingServer.readyState === WebSocket.OPEN) {
//       signalingServer.send(message);
//     } else {
//       messageQueue.push(message);
//     }
//   };

//   const handleSignalingData = (message) => {
//     if (typeof message.data === 'string') {
//       try {
//         const data = JSON.parse(message.data);
        
//         switch (data.type) {
//           case 'offer':
//             handleOffer(data.offer);
//             break;
//           case 'answer':
//             handleAnswer(data.answer);
//             break;
//           case 'candidate':
//             handleCandidate(data.candidate);
//             break;
//           default:
//             break;
//         }
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//       }
//     } else {
//       console.error('Received non-string message data:', message.data);
//     }
//   };

//   const startLocalStream = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         peerConnection = createPeerConnection();
//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.createOffer()
//           .then((offer) => {
//             peerConnection.setLocalDescription(offer);
//             sendSignalingMessage(JSON.stringify({ type: 'offer', offer: offer }));
//           });
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const createPeerConnection = () => {
//     const pc = new RTCPeerConnection();

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         sendSignalingMessage(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current.srcObject !== event.streams[0]) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return pc;
//   };



//   const handleOffer = (offer) => {
//     peerConnection = createPeerConnection();
//     peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);

//         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//         peerConnection.createAnswer()
//           .then((answer) => {
//             peerConnection.setLocalDescription(answer);
//             sendSignalingMessage(JSON.stringify({ type: 'answer', answer: answer }));
//           });
//       })
//       .catch((error) => console.error("Error accessing media devices.", error));
//   };

//   const handleAnswer = (answer) => {
//     peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleCandidate = (candidate) => {
//     const iceCandidate = new RTCIceCandidate(candidate);
//     peerConnection.addIceCandidate(iceCandidate);
//   };

//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks()[0].enabled = !isMicOn;
//       setIsMicOn(!isMicOn);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks()[0].enabled = !isVideoOn;
//       setIsVideoOn(!isVideoOn);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//       setLocalStream(null);
//     }
//     if (peerConnection) {
//       peerConnection.close();
//       peerConnection = null;
//     }
//     setIsEndingCall(true);
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 5000);
//   };
// // <--Adition by umairGPT-->

// const captureFrame = () => {
//   const canvas = canvasRef.current;
//   console.log(localVideoRef.current); 
//   if (!localVideoRef.current) return;

//     // if (!remoteVideoRef.current || !canvasRef.current) return;
//     //   console.log("capturing frames");
//     // const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const video = localVideoRef.current;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
//     canvas.toBlob((blob) => {
//       console.log(blob);
//       sendFrameToBackend(blob);
//     }, 'image/jpeg');
//   };

//   const sendFrameToBackend = (frame) => {
//     const formData = new FormData();
//     formData.append('frame', frame);
//       console.log("send backend")
//     axios.post('http://127.0.0.1:5000/app', formData)
//       .then(response => {
//         setEmotion(response.data.emotion);
//         console.log(response.data.emotion);
//       })
//       .catch(error => {
//         console.error("Error sending frame to backend", error);
//       });
//   };

//   const sendAudioToBackend = (audioBlob) => {
//     const formData = new FormData();
//     formData.append('audio', audioBlob);

//     axios.post('http://localhost:5000/audio-transcription', formData)
//       .then(response => {
//         setTranscription(response.data.transcription);
//         setEmotion(response.data.emotion);
//       })
//       .catch(error => {
//         console.error("Error sending audio to backend", error);
//       });
//   };
// //addition end 

//   return (
//     <div className="relative h-screen bg-gray-900 flex justify-center items-center">
//       <div className="flex flex-col items-center p-8 relative w-full h-full">
//         {isEndingCall && (
//           <div className="absolute inset-0 flex justify-center items-center text-white text-4xl">
//             Ending call...
//           </div>
//         )}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="w-full h-full object-cover"
//         ></video>
//         <div className="absolute bottom-24 right-20">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-32 h-32 object-cover"
//           ></video>
//         </div>
//       </div>
//       <button
//         onClick={toggleMic}
//         className="absolute bottom-14 left-24 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
//       </button>
//       <button
//         onClick={toggleVideo}
//         className="absolute bottom-14 left-48 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
//       >
//         {isVideoOn ? <CiVideoOn /> : <CiVideoOff />}
//       </button>
//       <button
//         onClick={endCall}
//         className="absolute bottom-14 left-72 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
//       >
//         <MdCallEnd />
//       </button>
//     </div>
//   );
// };




// export default App;

// this is running fine without any errors

//this is the previous code that we are using
//------------------------------------------------------------------------------------------

"use strict";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Predictions from '../Predictions/Predictions'; // Adjust path as needed
import { CiMicrophoneOn, CiMicrophoneOff, CiVideoOn, CiVideoOff } from "react-icons/ci";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../../../App.css'; // Import the CSS file for styling

const SIGNALING_SERVER_URL = 'ws://localhost:8080';
let peerConnection;
let signalingServer;
let messageQueue = [];

const App = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [transcription, setTranscription] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isEndingCall, setIsEndingCall] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false); // State to track transcription status
  const navigate = useNavigate();

  useEffect(() => {
    signalingServer = new WebSocket(SIGNALING_SERVER_URL);

    signalingServer.onopen = () => {
      while (messageQueue.length > 0) {
        signalingServer.send(messageQueue.shift());
      }
    };

    signalingServer.onmessage = handleSignalingData;

    startLocalStream();

    return () => {
      signalingServer.close();
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
      messageQueue.push(message);
    }
  };

  const handleSignalingData = (message) => {
    if (typeof message.data === 'string') {
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
            break;
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      console.error('Received non-string message data:', message.data);
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
          });
      })
      .catch((error) => console.error("Error accessing media devices.", error));
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
          });
      })
      .catch((error) => console.error("Error accessing media devices.", error));
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
      localStream.getAudioTracks()[0].enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !isVideoOn;
      setIsVideoOn(!isVideoOn);
    }
  };

  const startTranscription = () => {
    setIsTranscribing(true);
    axios.post('http://127.0.0.1:5000/start-transcription')
      .then(response => {
        console.log("Transcription started.");
      })
      .catch(error => {
        console.error("Error starting transcription:", error);
        setIsTranscribing(false);
      });
  };

  const stopTranscription = () => {
    setIsTranscribing(false);
    axios.post('http://127.0.0.1:5000/stop-transcription')
      .then(response => {
        console.log("Transcription stopped.");
      })
      .catch(error => {
        console.error("Error stopping transcription:", error);
      });
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
    if (!remoteVideoRef.current) return;

    const context = canvas.getContext('2d');
    const video = remoteVideoRef.current;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      sendFrameToBackend(blob);
    }, 'image/jpeg');
  };

  const sendFrameToBackend = (frame) => {
    const formData = new FormData();
    formData.append('frame', frame);

    axios.post('http://127.0.0.1:5000/emotion-detection', formData)
      .then(response => {
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
        className="absolute bottom-14 left-24 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
      >
        {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
      </button>
      <button
        onClick={toggleVideo}
        className="absolute bottom-14 left-48 transform -translate-x-1/2 px-4 py-2 text-2xl bg-gray-600 hover:bg-gray-700 duration-500 text-white rounded-full"
      >
        {isVideoOn ? <CiVideoOn /> : <CiVideoOff />}
      </button>
      <button
        onClick={endCall}
        className="absolute bottom-14 left-72 transform -translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
      >
        <MdCallEnd />
      </button>
      {!isTranscribing ? (
        <button
          onClick={startTranscription}
          className="absolute bottom-14 right-24 transform translate-x-1/2 px-4 py-2 text-2xl bg-blue-600 hover:bg-blue-700 duration-500 text-white rounded-full"
        >
          Start Transcription
        </button>
      ) : (
        <button
          onClick={stopTranscription}
          className="absolute bottom-14 right-24 transform translate-x-1/2 px-4 py-2 text-2xl bg-red-600 hover:bg-red-700 duration-500 text-white rounded-full"
        >
          Stop Transcription
        </button>
      )}
      <Predictions emotion={emotion} />
    </div>
  );
};

export default App;
