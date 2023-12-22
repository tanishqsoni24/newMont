import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
export default function IncomingDetails() {
  const [incomedetails, setIncomeDetails] = useState([])
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color");
    };
  }, []);
  useEffect(() => {
    try{

      const userIncomeDetails = async () => {
        const token = Cookies.get("session_id");
        const decoded = await jwt_decode(token);
        const response = await axios.post('http://192.168.1.11:8000/accounts/myIncomeDetails/', {
          phone_number: decoded.phone_number
        }, { headers: { 'Content-Type': 'application/json' } });
        
        setIncomeDetails(response.data.data);
        
        console.log(response.data.data);
      };
      userIncomeDetails();
    }
    catch(err){
      // console.log(err)
    }

}, []);
  return (
    <div
      style={{ marginTop: "7rem" }}
      className="container flex flex-col mx-auto justify-center item-center"
    >
      <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
        <div className="withdrawals flex flex-col item-center justify-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Incoming Details
          </h2>
        </div>
      </div>

      <div class="relative overflow-x-auto mx-2 my-4">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Income Type
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Amount Added
              </th>
            </tr>
          </thead>
          <tbody>
            {incomedetails.length > 0 ? (
              incomedetails.map((income, index) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {income.income_type}
                    </th>
                    <td class="px-6 py-4">{income.date}</td>
                    <td class="px-6 py-4">
                    ₹{income.amount}
                    </td>
                  </tr>
                );
              })):""}
          </tbody>
        </table>
        <div className="noice flex flex-col justify-center my-5">
          {incomedetails.length > 0 ? (
            ""
          ) : (
            <p className="text-red-500 text-center">
              *No Income Record Found
            </p>
          )  
          }
        </div>
      </div>
    </div>
  );
}
