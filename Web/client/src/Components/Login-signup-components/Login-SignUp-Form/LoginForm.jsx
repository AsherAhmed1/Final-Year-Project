import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((res) => {
        if (res.data.status) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const googleAuth = () => {
    window.open(`http://localhost:3000/auth/google/callback`, "_self");
  };

  return (
    <div>
      {/* login option */}
      <div>
        <div>
          <h1
            //   style={{ fontFamily: "Edu NSW ACT Foundation" }}
            style={{ fontFamily: "Dancing Script" }}
            className="text-5xl font-bold text-center mt-28"
          >
            Log into your account
          </h1>
        </div>

        <div className="flex justify-center ">
          <div
            className="flex flex-row items-center bg-white border mt-5 w-96 p-5 rounded-lg cursor-pointer"
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

        <div className="flex justify-center mt-4">
          <h1 className="text-base font-bold">or</h1>
        </div>
      </div>
      {/* login option end */}

      {/* login form */}
      <div className="flex justify-center">
        <form className="border-none " onSubmit={handleSubmit}>
          <div className="mt-5">
            {/* For Name */}
            <div className="flex flex-col w-96">
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

              <div className="bg-white flex flex-col rounded-lg px-4 py-2 mb-4">
                <label htmlFor="password" className="p-1">
                  PASSWORD
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="p-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div
              className="bg-blue-700 text-center rounded-lg"
              style={{ width: "100%" }}
            >
              <button
                id="create-account"
                name="create-account"
                className="text-white p-4"
              >
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-row justify-center mt-8 space-x-32">
        <div className="text-blue-700 underline">
          <a href="/signup">Don't have an account?</a>
        </div>

        <div className="text-blue-700 underline">
          <h1>Forgot password?</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
