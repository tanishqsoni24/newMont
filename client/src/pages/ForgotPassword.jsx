import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/general/Spinner";
// import Spinner from '../components/general/Spinner'
// import sign  from "jwt-encode";
// import Cookies from 'js-cookie'
// import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  const [number, setNumber] = useState({
    phone_number: "",
  });

  const [otp, setOtp] = useState({
    otp: "",
    phone_number: number.phone_number,
  });

  const [isAskPassword, setIsAskPassword] = useState(false);

  const [newPass, setNewPass] = useState({
    password: "",
    confirm_new_password: "",
  });

  const handlePassChange = (e) => {
    
    const { name, value } = e.target;
    setNewPass({
      ...newPass,
      [name]: value,
      phone_number: number.phone_number,
    });
    
    //(newPass)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumber({ ...number, [name]: value });
    //(number)
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value, phone_number: number.phone_number });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mygoldmalls.com/api/accounts/forgot-password/",
        number,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //(response)
      //(response.data)
      setErrorMessage(response.data.message);
      if (response.data.status == "Success") {
        setIsOtp(true);
      }
      setLoading(false);
    } catch (err) {
      //(err)
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mygoldmalls.com/api/accounts/verify-forgot-password-token/",
        otp,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //(response)
      //(response.data)
      if (response.data.status == "Success") {
        setIsOtp(false);
        setIsAskPassword(true);
      }
      else{
        setErrorMessage("Wrong OTP entered")
      }
    } catch (err) {
      alert("Wrong OTP entered");
    }
    setLoading(false);
  };

  const handlePassSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mygoldmalls.com/api/accounts/reset-password/",
        newPass,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //(response)
      //(response.data)
      if (response.data.status == "Success") {
        window.location.href = "/login";
      }
    } catch (err) {
      //(err)
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-blue-900 md:text-4xl dark:text-white">
          My GoldMalls
        </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                {!isOtp &&
                  !isAskPassword && (
                    <label
                      for="nummber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Phone Number
                    </label>
                  ) && (
                    <input
                      onChange={handleChange}
                      type="number"
                      name="phone_number"
                      id="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="7565889452"
                      required=""
                    />
                  )}

                {isOtp && (
                    <label
                      for="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter OTP Here
                    </label>
                  ) && (
                    <input
                      onChange={handleOtpChange}
                      type="number"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123456"
                      required=""
                    />
                  )}

                {isAskPassword && (
                    <label
                      for="new_pass"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                  ) && (
                    <input
                      onChange={handlePassChange}
                      type="password"
                      name="password"
                      id="new_password"
                      className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="New Password"
                      required=""
                    />
                  )}

                {isAskPassword && (
                    <label
                      for="confirm_pass"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm New Password
                    </label>
                  ) && (
                    <input
                      onChange={handlePassChange}
                      type="password"
                      name="confirm_new_password"
                      id="confirm_new_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Confirm New Password"
                      required=""
                    />
                  )
                  }
              </div>
              {!isOtp && !isAskPassword && (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get OTP
                </button>
              )}

              {isOtp && (
                <button
                  onClick={handleOtpSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              )}

              {isAskPassword && (
                <button
                  onClick={handlePassSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit Password
                </button>
              )}
            </form>
            <p className="text-sm text-blue-500 text-center dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        </div>
        {loading && <Spinner />}
      </div>
    </section>
  );
}
