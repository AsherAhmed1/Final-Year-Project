import React, { useState } from "react";
import Heading from "../Heading/Heading";
import countries from "countries";

const Form = () => {
  // For company size

  const [selectedSize, setselectedSize] = useState("");
  const handleSizeChange = (e) => {
    setselectedSize(e.target.value);
  };
  const size = [
    "Select",
    "1-200 employees",
    "201-2,500 employees",
    "2,501-10,000 employees",
    "10,001+ employees",
  ];

  // For country names

  const [selectedReason, setselectedReason] = useState("");
  const handleReasonChange = (e) => {
    setselectedReason(e.target.value);
  };
  const reason = [
    "Select",
    "Want talk to sales",
    "Question about pricing",
    "Want more resources",
    "Need support",
  ];

  return (
    <div>
      <div className="flex">
        <div>
          <Heading />
        </div>
        <form className="border-none" action="">
          <div className="mt-44 mr-20">
            {/* For Name */}
            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white rounded-lg px-4 py-2 mb-4">
                <label htmlFor="firstName" className="p-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="p-1 border-none border-opacity-0"
                />
              </div>

              <div className="bg-white rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="lastName" className="p-1">
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="p-1"
                />
              </div>
            </div>

            {/* for phone and email */}

            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white rounded-lg px-4 py-2 mb-4">
                <label htmlFor="email" className="p-1">
                  EMAIL
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="p-1 border-none border-opacity-0"
                />
              </div>

              <div className="bg-white rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="phone" className="p-1">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="p-1"
                />
              </div>
            </div>

            {/* for company and its size */}

            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white rounded-lg px-4 py-2 mb-4">
                <label htmlFor="company" className="p-1">
                  COMPANY
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Where do you work?"
                  className="p-1 border-none border-opacity-0"
                />
              </div>

              <div className="bg-white rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="size" className="p-1">
                  COMPANY SIZE
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                  className="p-1"
                >
                  {/* Map through the array of size to generate options */}
                  {size.map((Size, index) => (
                    <option key={index} value={Size}>
                      {Size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* for title and Size */}

            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white rounded-lg px-4 py-2 mb-4">
                <label htmlFor="title" className="p-1">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="What is your job title??"
                  className="p-1 border-none border-opacity-0"
                />
              </div>

              <div className="bg-white rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="reason" className="p-1">
                  QUESTION
                </label>
                <select
                  id="reason"
                  value={selectedReason}
                  onChange={handleReasonChange}
                  className="p-1"
                >
                  {/* Map through the array of size to generate options */}
                  {reason.map((Reason, index) => (
                    <option key={index} value={Reason}>
                      {Reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ width: "85%" }}>
            {/* Form */}
            <div className="bg-white rounded-lg px-4 py-2 mb-4">
              <label htmlFor="message" className="p-1">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your query"
                className="p-1 border-none border-opacity-0 mt-2"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div>
            <div
              className="bg-green-700 text-center rounded-lg"
              style={{ width: "85%" }}
            >
              <button id="submit" name="submit" className="text-white p-4">
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <br />
      </div>

      <div className="flex justify-end mr-20">
        <hr
          className="border-b-1 border-black rounded-lg"
          style={{ width: "37.5%" }}
        />
      </div>

      <div className="flex justify-end w-3/5" style={{ marginLeft: "28.5%" }}>
        <div className="mt-5 w-1/2">
          <h1 className="text-lg ">
            By submitting this form, you agree to VisuMeet{" "}
            <span className="underline font-bold text-blue-400">
              Terms of Service and Privacy Policy.
            </span>
          </h1>
        </div>
      </div>

      <div>
        <br />
      </div>

      <div className="flex justify-end mr-20">
        <hr
          className="border-b-1 border-black rounded-lg"
          style={{ width: "37.5%" }}
        />
      </div>

      <div className="flex justify-end w-3/5" style={{ marginLeft: "28.5%" }}>
        <div className="mt-5 w-1/2">
          <h1 className="text-lg ">
            Looking for help with the product?{" "}
            <span className="underline font-bold text-blue-400">
              Go to help center.
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Form;
