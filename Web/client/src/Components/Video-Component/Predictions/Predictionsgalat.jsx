import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const emotions = [
  "sad",
  "angry",
  "fear",
  "disgust",
  "happy",
  "neutral",
  "surprise",
];

const Predictions = () => {
  const [emotionData, setEmotionData] = useState({
    sad: 0,
    angry: 0,
    fear: 0,
    disgust: 0,
    happy: 0,
    neutral: 0,
    surprise: 0,
  });

  const fetchEmotionData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/emotion-detection");
      console.log("Fetching emotion data...");
      console.log(response);
      setEmotionData(response.data.emotion); // Assuming response structure { emotion: { sad, angry, fear, ... } }
    } catch (error) {
      console.error("Error fetching emotion data:", error);
    }
  };
  const fetchTextEmotion = async () => {
    try {
      // Ensure you are sending the correct payload
      const formData = new FormData();
      formData.append('audio', 'path_to_audio_file'); // Adjust as per actual audio file source
  
      const response = await axios.post("http://127.0.0.1:5000/audio-transcription", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("Fetching text emotion data...");
      console.log(response);
      setEmotionData(response.data.emotion);
    } catch (error) {
      console.error("Error fetching text emotion data:", error);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(fetchEmotionData, 1000); // Fetch emotion data every 1 second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchTextEmotion, 2000); // Fetch text emotion data every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const data = {
    labels: emotions,
    datasets: [
      {
        label: "Emotion Levels",
        data: emotions.map((emotion) => emotionData[emotion]),
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 w-3/6">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Real-Time Emotion Detection
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Predictions;
