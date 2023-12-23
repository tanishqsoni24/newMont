import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';

export default function Otp() {
  const[loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const [timer, setTimer] = useState("1:00");
    const handelResendOtp = async (e) => {

        // request for resend otp
        e.preventDefault();
        const token = Cookies.get("phone_number");
        const decoded = jwtDecode(token);
        const response = await axios.post('http://143.110.179.22:8000/accounts/resend-otp/', {
            phone_number: decoded.phone_number
        }, { headers: { 'Content-Type': 'application/json' } });

        //(response.data)

        // set timer to 1 minute

        if (response.data.status === "Success") {
          setTimer("1:00");
        }




        

    };

    const [otp, setOtp] = useState('')
    const handelSubmit = async (e) => {
      setLoading(true);
        e.preventDefault()
        const token = Cookies.get("phone_number");
        const decoded = await jwtDecode(token);
        const response = await axios.post('http://143.110.179.22:8000/accounts/activate/', {
          phone_number: decoded.phone_number,
          otp: otp
        }, { headers: { 'Content-Type': 'application/json' } });

        //(response.data)

        if (response.data.status === "Success") {
            //('success')
            navigate('/login')
        }
        setLoading(false);
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
  <h1  className="text-2xl font-semibold leading-tight m-2 tracking-tight text-blue-900 md:text-4xl dark:text-white">
                  My GoldMalls
              </h1>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
                  OTP Verification
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                      {timer === "0:00" ? 
                      (<input type="number" disabled name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="756588" required=""/>):
                      (<input type="number" 
                      onChange={(e)=>setOtp(e.target.value)}
                        value={otp}
                      name="otp" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="756588" required=""/>)}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {/* 1 minute countdown */}
                    <p className='text-sm text-gray-500'>OTP expires in {timer} mins</p>
                    {/* Resend OTP */}
                    
                  </div>
                  <button type="submit"
                  onClick={handelSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? 'Submitting...' : 'Submit'}</button>
                  
                  <div className="flex flex-col items-center justify-center">
                  <p className='text-sm text-gray-500'>Didn't get OTP? <button onClick={handelResendOtp} className='text-blue-600'>Resend OTP</button></p>
                  </div>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
