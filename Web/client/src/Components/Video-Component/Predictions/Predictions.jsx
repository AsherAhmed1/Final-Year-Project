
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const emotions = [
//   "sad/fear",
//   "angry",
//   "happy",
//   "neutral",
//   "surprise/disgust",
// ];

// const Predictions = ({ emotion }) => {
//   // State to hold emotion data
//   const [emotionData, setEmotionData] = useState({
//     sad_fear: 0,
//     angry: 0,
//     surprise_disgust: 0,
//     happy: 0,
//     neutral: 0,
//   });

//   // Function to normalize emotion name
//   const normalizeEmotionName = (name) => {
//     return name.toLowerCase().replace(/\//g, "_");
//   };

//   useEffect(() => {
//     if (Array.isArray(emotion) && emotion.length >= 4) { // Check if emotion is an array and has enough elements
//       const [emotionName, index, probability, confidence] = emotion;
//       const normalizedEmotionName = normalizeEmotionName(emotionName);

//       // Update emotionData based on the received emotion
//       setEmotionData((prevData) => ({
//         ...prevData,
//         [normalizedEmotionName]: prevData[normalizedEmotionName] + 1,
//       }));
//     }
//   }, [emotion]);

//   const data = {
//     labels: emotions,
//     datasets: [
//       {
//         label: "Emotion Levels",
//         data: emotions.map((emotion) => emotionData[normalizeEmotionName(emotion)]),
//         backgroundColor: [
//           "rgba(0, 255, 0, 0.2)", // Adjust colors as needed
//         ],
//         borderColor: ["rgba(0, 255, 0, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="container mx-auto p-4 w-3/6">
//       <h2 className="text-2xl font-bold mb-4 text-white">
//         Real-Time Emotion Prediction
//       </h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default Predictions;
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const emotions = [
  "sad/fear",
  "angry",
  "happy",
  "neutral",
  "surprise/disgust",
];

const Predictions = ({ emotion }) => {
  // State to hold emotion data
  const [emotionData, setEmotionData] = useState({
    sad_fear: 0,
    angry: 0,
    surprise_disgust: 0,
    happy: 0,
    neutral: 0,
  });

  // State to hold confidence level data
  const [confidenceLevel, setConfidenceLevel] = useState(0);

  // Function to normalize emotion name
  const normalizeEmotionName = (name) => {
    return name.toLowerCase().replace(/\//g, "_");
  };

  useEffect(() => {
    if (Array.isArray(emotion) && emotion.length >= 4) { // Check if emotion is an array and has enough elements
      const [emotionName, , , confidence] = emotion;
      const normalizedEmotionName = normalizeEmotionName(emotionName);

      // Update emotionData based on the received emotion
      setEmotionData((prevData) => ({
        ...prevData,
        [normalizedEmotionName]: prevData[normalizedEmotionName] + 1,
      }));

      // Update confidenceLevel based on the received emotion
      setConfidenceLevel(confidence);
    }
  }, [emotion]);

  const emotionDataChart = {
    labels: emotions,
    datasets: [
      {
        label: "Emotion Levels",
        data: emotions.map((emotion) => emotionData[normalizeEmotionName(emotion)]),
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const confidenceLevelChart = {
    labels: ['Confidence Level'],
    datasets: [
      {
        label: "Confidence Level",
        data: [confidenceLevel],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
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

  const confidenceOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1, // Assuming confidence level is between 0 and 1
      },
    },
  };

  return (
    <div className="container mx-auto p-4 w-3/6">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Real-Time Emotion Prediction
      </h2>
      <Bar data={emotionDataChart} options={options} />
      <h2 className="text-2xl font-bold mb-4 text-white mt-8">
        Confidence Level
      </h2>
      <Bar data={confidenceLevelChart} options={confidenceOptions} />
    </div>
  );
};

export default Predictions;
