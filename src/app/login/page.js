"use client";
import React, { useState } from "react";
import { ApiFetcher } from "../_customHooks/useButtonClickFetcher";
import toast from "react-hot-toast";
import { PrintLogs } from "../_utils/constant";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetail.username || !userDetail.password) {
      toast.error("All fields are required!");
      return;
    }

    // window.location.href = "/";

    try {
      const response = await ApiFetcher("login", userDetail);
      console.log("response is", response);
      if (response.code === 0) {
        const expiry_time = 24 * 60 * 60 * 1000;
        document.cookie = `jwtoken=${
          response.data.access_token
        }; path=/; expires=${new Date(Date.now() + expiry_time).toUTCString()}`;
        toast.success(response.message);
        window.location.href = "/client";
      } else {
        toast.error(
          response.message === "Wrong passcode"
            ? "Wrong Password"
            : response.message
        );
      }
    } catch (error) {
      PrintLogs(error);
    }
  };

  const functionSetUserDetails = (field, value) => {
    setUserDetail((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
          <div className="card overflow-hidden sm:rounded-md rounded-none">
            <div className="p-6">
              <a href="/" className="flex mb-8 items-center justify-center">
                <img
                  className="h-10 block dark:hidden"
                  src="/images/noyt.png"
                  alt=""
                />
                <img
                  className="h-10 hidden dark:block"
                  src="/images/noyt.png"
                  alt=""
                />
              </a>
              <form
                className="form needs-validation"
                noValidate
                action="project"
              >
                {/* <form className="form needs-validation" noValidate action="index"> */}
                <div id="error" className="text-danger"></div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
                    htmlFor="LoggingEmailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    id="emailaddress"
                    className="form-input"
                    type="email"
                    placeholder="Enter your email"
                    // value="konrix@coderthemes.com"
                    value={userDetail.username}
                    onChange={(e) =>
                      functionSetUserDetails("username", e.target.value)
                    }
                    required
                  />
                </div>

                {/* <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-input"
                    type="password"
                    placeholder="Enter your password"
                    value={userDetail.password}
                    onChange={(e) =>
                      functionSetUserDetails("password", e.target.value)
                    }
                    required
                  />
                </div> */}

                <div className="mb-4 relative ">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
                    Password
                    <input
                      className="form-input mt-2"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={userDetail.password}
                      onChange={(e) =>
                        functionSetUserDetails("password", e.target.value)
                      }
                      required
                    />
                    <span className="absolute right-3 top-4 flex items-center justify-center h-full text-slate-400 cursor-pointer peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                      {showPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowPassword(false)} // Hide password
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowPassword(true)} // Show password
                        />
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex justify-center mb-6 mt-8">
                  <button
                    className="btn w-full text-white bg-primary"
                    onClick={handleSubmit}
                  >
                    {" "}
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
