import React from "react";

const page = () => {
  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
          <div className="card overflow-hidden sm:rounded-md rounded-none">
            <div className="p-6">
              <a href="/" className="block mb-8">
                <img
                  className="h-6 block dark:hidden"
                  src="/images/logo-dark.png"
                  alt=""
                />
                <img
                  className="h-6 hidden dark:block"
                  src="/images/logo-light.png"
                  alt=""
                />
              </a>

              <form className="form needs-validation" noValidate action="/">
                {/* <form className="form needs-validation" noValidate action="index"> */}
                <div id="error" className="text-danger"></div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
                    htmlFor="LoggingEmailAddress"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    placeholder="Enter your Name"
                    required
                  />
                </div>

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
                    required
                  />
                </div>

                <div className="mb-4">
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
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded"
                      id="checkbox-signup"
                    />
                    <label
                      className="ms-2 text-slate-900 dark:text-slate-200"
                      htmlFor="checkbox-signup"
                    >
                      I accept{" "}
                      <a href="#" className="text-gray-400 underline">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <button className="btn w-full text-white bg-primary">
                    {" "}
                    Register
                  </button>
                </div>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-auto mt-px border-t border-dashed border-gray-200 dark:border-slate-700"></div>
                <div className="mx-4 text-secondary">Or</div>
                <div className="flex-auto mt-px border-t border-dashed border-gray-200 dark:border-slate-700"></div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-center">
                Already have account ?
                <a href="login" className="text-primary ms-1">
                  <b>Log In</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
