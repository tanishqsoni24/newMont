import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { useNavigate } from "react-router-dom";

export default function Otp() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState("1:00");
    const handelResendOtp = () => {

        // request for resend otp




        setTimer("1:00");

    };

    const [otp, setOtp] = useState('')
    const handelSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/accounts/activate/', otp, { headers: { 'Content-Type': 'application/json' } });

        console.log(response)

        if (response.status === 200) {
            console.log('success')
            navigate('/');

        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
          setTimer((timer) => {
            const time = timer.split(":");
            let minutes = parseInt(time[0]);
            let seconds = parseInt(time[1]);
            if (seconds === 0) {
              if (minutes === 0) {
                return "0:00";
              } else {
                minutes -= 1;
                seconds = 59;
              }
            } else {
              seconds -= 1;
            }
            return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
          });
        }, 1000);
        return () => clearInterval(interval);
      }, []);
  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <h1  className="text-2xl font-semibold leading-tight tracking-tight text-emerald-900 md:text-4xl dark:text-white">
                  New Mont
              </h1>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  OTP Verification
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                      {timer === "0:00" ? 
                      (<input type="number" disabled name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="756588" required=""/>):
                      (<input type="number" 
                      onChange={(e)=>setOtp(e.target.value)}
                        value={otp}
                      name="otp" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="756588" required=""/>)}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {/* 1 minute countdown */}
                    <p className='text-sm text-gray-500'>Resend OTP in {timer}</p>
                    {/* Resend OTP */}
                    <p className='text-sm text-gray-500'>Didn't get OTP? <button onClick={handelResendOtp} className='text-emerald-600'>Resend OTP</button></p>
                  </div>
                  <button type="submit" className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
