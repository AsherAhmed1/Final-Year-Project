import React, { useState } from "react";
import Axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      // Change the URL to target port 3000
      firstName,
      lastName,
      email,
      phone,
      password,
      rPassword,
    })
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const googleAuth = () => {
    window.open(
      `http://localhost:3000/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div>
      <div>
        <a
          href="/"
          style={{ fontFamily: "Dancing Script" }}
          className="text-7xl flex justify-center mt-16 text-blue-700"
        >
          VisuMeet
        </a>
      </div>
      <div>
        <h1
          style={{ fontFamily: "Edu NSW ACT Foundation" }}
          className="text-5xl font-bold text-center mt-10"
        >
          Create An Account
        </h1>
      </div>

      <div className="flex justify-center ">
        <form className="border-none" onSubmit={handleSubmit}>
          <div className="mt-10">
            {/* For Name */}
            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white flex flex-col rounded-lg px-4 py-2 mb-4">
                <label htmlFor="firstName" className="p-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="p-1 border-none border-opacity-0"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="bg-white flex flex-col rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="lastName" className="p-1">
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="p-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* for phone and email */}

            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white flex flex-col rounded-lg px-4 py-2 mb-4">
                <label htmlFor="email" className="p-1">
                  EMAIL
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="p-1 border-none border-opacity-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="bg-white flex flex-col rounded-lg px-4 py-2 ml-4 mb-4">
                <label htmlFor="phone" className="p-1">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="p-1"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row">
              {/* Form */}
              <div className="bg-white flex flex-col  rounded-lg px-4 py-2 mb-4">
                <label htmlFor="password" className="p-1">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="p-1 border-none border-opacity-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="bg-white flex flex-col ml-4 rounded-lg px-4 py-2 mb-4">
                <label htmlFor="rPassword" className="p-1">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  id="rPassword"
                  name="rPassword"
                  placeholder="Confirm your password"
                  className="p-1 border-none border-opacity-0"
                  onChange={(e) => setRPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div
              className="bg-green-700 text-center rounded-lg"
              style={{ width: "100%" }}
            >
              <button
                type="submit"
                id="submit"
                name="submit"
                className="text-white p-4"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-row justify-center mt-8 space-x-44">
        <div className="text-blue-700 underline mb-5">
          <a href="/login">Already have an account?</a>
        </div>
      </div>

      <div className="flex justify-center">
        <h1 className="text-base font-bold">or</h1>
      </div>

      <div className="flex justify-center ">
        <div
          className="flex flex-row items-center bg-white border mt-5 mb-20 w-96 p-5 rounded-lg cursor-pointer"
          onClick={googleAuth}
        >
          <div className="text-xl">
            <FcGoogle />
          </div>

          <div className="font-bold mx-auto">
            <h1>Sign in with google</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
