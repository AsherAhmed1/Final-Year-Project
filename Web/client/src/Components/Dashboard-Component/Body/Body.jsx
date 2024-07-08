// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Body = () => {
//   const [open, setOpen] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [meetingDetailsList, setMeetingDetailsList] = useState([]);
//   const [newMeeting, setNewMeeting] = useState({
//     title: "",
//     startDate: null,
//     duration: "",
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newMeetingDetailsList = [...meetingDetailsList, newMeeting];
//     setMeetingDetailsList(newMeetingDetailsList);
//     setNewMeeting({
//       title: "",
//       startDate: null,
//       duration: "",
//     });
//   };

//   const getFormattedDate = (date) => {
//     const options = {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//     };
//     return new Date(date).toLocaleDateString("en-US", options);
//   };

//   return (
//     <div>
//       <div className="text-2xl mx-10 w-fit">
//         <div
//           onClick={() => setOpen(!open)}
//           className="cursor-pointer z-50 flex items-center "
//         >
//           <div
//             className="mt-28 ml-16 bg-blue-500 w-40 p-3 rounded-xl hover:bg-blue-700 duration-500
//                        cursor-pointer text-center text-white text-2xl"
//             style={{ fontFamily: "Dancing Script" }}
//           >
//             <div> Create Meeting </div>
//           </div>
//         </div>
//       </div>

//       {open && (
//         <ul
//           className="bg-white mt-6 rounded-2xl shadow-2xl"
//           style={{ marginLeft: "6.5rem", width: "52rem" }}
//         >
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col">
//               {/* Form */}
//               <div className="bg-white rounded-lg px-4 mt-8 py-2 flex flex-col">
//                 <label htmlFor="title" className="p-1">
//                   Title of the Meeting
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   placeholder="What is your meeting title?"
//                   className="p-1 border rounded-xl"
//                   style={{ width: "50rem" }}
//                   value={newMeeting.title}
//                   onChange={(e) =>
//                     setNewMeeting({ ...newMeeting, title: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="flex flex-row">
//               <div className="bg-white rounded-lg px-4 py-2 mb-4 mt-8 flex flex-col">
//                 <label htmlFor="title" className="p-1">
//                   Start Date
//                 </label>
//                 <DatePicker
//                   selected={newMeeting.startDate} // Selected date
//                   onChange={(date) =>
//                     setNewMeeting({ ...newMeeting, startDate: date })
//                   } // Function to update selected date
//                   showTimeSelect // Show time select
//                   dateFormat="dd/MM/yyyy HH:mm" // Date format
//                   placeholderText="dd/mm/yyyy hh:mm" // Placeholder text
//                   className="p-1 border rounded-xl w-96" // Classname for styling
//                 />
//               </div>

//               <div className="flex flex-col">
//                 {/* Form */}
//                 <div className="bg-white rounded-lg px-4 py-2 mb-4 mt-8 flex flex-col">
//                   <label htmlFor="duration" className="p-1">
//                     Duration (in minutes)
//                   </label>
//                   <input
//                     type="text"
//                     id="duration"
//                     name="duration"
//                     placeholder="minutes"
//                     className="p-1 border rounded-xl w-96"
//                     value={newMeeting.duration}
//                     onChange={(e) =>
//                       setNewMeeting({ ...newMeeting, duration: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <div
//                 className="bg-blue-500 mb-8 text-center rounded-lg"
//                 style={{ width: "25%" }}
//               >
//                 <button id="submit" name="submit" className="text-white p-4">
//                   Schedule Meeting
//                 </button>
//               </div>
//             </div>
//           </form>
//         </ul>
//       )}

//       {/* Display scheduled meeting details */}
//       {meetingDetailsList.length > 0 && (
//         <div>
//           <div>
//             <div className="mt-8 ml-24 bg-white w-fit p-8">
//               {meetingDetailsList.map((meeting, index) => (
//                 <div key={index}>
//                   <div className="flex space-x-16">
//                     <p>{getFormattedDate(meeting.startDate)}</p>
//                     <p>{meeting.title}</p>
//                   </div>
//                   <p>{meeting.duration} minutes</p>
//                 </div>
//               ))}
//             </div>

//             {/* Buttons will come here for join, edit, and delete */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Body;

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const [open, setOpen] = useState(false);
  const [meetingDetailsList, setMeetingDetailsList] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    startDate: null,
    duration: "",
  });
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // alert(`Joining meeting: ${meeting.title}`);
    navigate('/video');
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/meetings")
      .then((response) => {
        setMeetingDetailsList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the meetings!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting new meeting:", newMeeting);

    // Check if all fields are filled
    if (!newMeeting.title || !newMeeting.startDate || !newMeeting.duration) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:3000/meetings", newMeeting)
      .then((response) => {
        console.log("Meeting created successfully:", response.data);
        setMeetingDetailsList([...meetingDetailsList, response.data]);
        setNewMeeting({
          title: "",
          startDate: null,
          duration: "",
        });
      })
      .catch((error) => {
        console.error("There was an error creating the meeting!", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/meetings/${id}`)
      .then(() => {
        setMeetingDetailsList(
          meetingDetailsList.filter((meeting) => meeting._id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the meeting!", error);
      });
  };

  const getFormattedDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div className="text-2xl mx-10 w-fit">
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer z-50 flex items-center"
        >
          <div
            className="mt-28 ml-16 bg-blue-500 w-40 p-3 rounded-xl hover:bg-blue-700 duration-500 cursor-pointer text-center text-white text-2xl"
            style={{ fontFamily: "Dancing Script" }}
          >
            <div> Create Meeting </div>
          </div>
        </div>
      </div>

      {open && (
        <ul
          className="bg-white mt-6 rounded-2xl shadow-2xl"
          style={{ marginLeft: "6.5rem", width: "52rem" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="bg-white rounded-lg px-4 mt-8 py-2 flex flex-col">
                <label htmlFor="title" className="p-1">
                  Title of the Meeting
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="What is your meeting title?"
                  className="p-1 border rounded-xl"
                  style={{ width: "50rem" }}
                  value={newMeeting.title}
                  onChange={(e) =>
                    setNewMeeting({ ...newMeeting, title: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row">
              <div className="bg-white rounded-lg px-4 py-2 mb-4 mt-8 flex flex-col">
                <label htmlFor="startDate" className="p-1">
                  Start Date
                </label>
                <DatePicker
                  selected={newMeeting.startDate}
                  onChange={(date) =>
                    setNewMeeting({ ...newMeeting, startDate: date })
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="dd/mm/yyyy hh:mm"
                  className="p-1 border rounded-xl w-96"
                />
              </div>

              <div className="flex flex-col">
                <div className="bg-white rounded-lg px-4 py-2 mb-4 mt-8 flex flex-col">
                  <label htmlFor="duration" className="p-1">
                    Duration (in minutes)
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="minutes"
                    className="p-1 border rounded-xl w-96"
                    value={newMeeting.duration}
                    onChange={(e) =>
                      setNewMeeting({ ...newMeeting, duration: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="bg-blue-500 mb-8 text-center rounded-lg"
                style={{ width: "25%" }}
              >
                <button
                  type="submit"
                  id="submit"
                  name="submit"
                  className="text-white p-4"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </form>
        </ul>
      )}

      {meetingDetailsList.length > 0 && (
        <div className="mt-10 ml-24">
          {meetingDetailsList.map((meeting, index) => (
            <div
              key={index}
              className="bg-white p-8 mb-4 rounded-2xl shadow-lg"
              style={{ width: '92%' }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">
                    {getFormattedDate(meeting.startDate)}
                  </p>
                </div>
                <div class>
                  <p className="text-lg font-medium">{meeting.title}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDelete(meeting._id)}
                    className="text-white hover:bg-red-700 bg-red-500 p-2 px-4 rounded-2xl duration-500 cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleJoinClick}
                    className="text-white hover:bg-blue-700 bg-blue-500 p-2 px-4 rounded-2xl duration-500 cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {meeting.duration} minutes
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
