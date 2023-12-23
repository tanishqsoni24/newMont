import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import axios from "axios";
import Cookies from "js-cookie";
import staticImage from '../components/Images/bank-card-static.png';
import gif from '../components/Images/icons8-bank-card.gif'; // Replace with your static image
import jwt_decode from "jwt-decode";

export default function BankCard() {
  const [bankCard, setBankCard] = useState([]);
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add('body-bg-color');
  
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('body-bg-color');
    };
  }, []);
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const showmybankcard = async () => {
      const token = Cookies.get("session_id");
      const decoded = await jwt_decode(token);
      const response = await axios.post('http://143.110.179.22:8000/accounts/showmybankcard/', {
        phone_number: decoded.phone_number
      }, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.status === "Success") {
        //(response.data.data);
        setBankCard(response.data.data);
      }
    };
    showmybankcard();

    // Stop the GIF after 2 seconds
    setTimeout(() => {
      setShowGif(false);
    }, 1100);
  }, []);

  return (
    <div
      style={{ marginTop: "7rem" }}
      className="container flex flex-col mx-auto justify-center items-center"
    >
      <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
        <div className="withdrawals flex flex-col items-center justify-center">
          
            <img src={staticImage} className="w-11" alt="bank-card" />
          

          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Bank Card
          </h2>
          {bankCard.length > 0 &&
            bankCard.map((bankCard, index) => {
              return (
                <div className="max-w-sm w-full my-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold">Card Holder Name:</span>{" "}
                    {bankCard.card_holder_name} <br />
                    <span className="font-bold">Bank Name:</span>{" "}
                    {bankCard.bank_name} <br />
                    <span className="font-bold">Card Number:</span>{" "}
                    {bankCard.card_number} <br />
                    <span className="font-bold">IFSC Code:</span>{" "}
                    {bankCard.ifsc_code} <br />
                  </p>
                </div>
              );
            })}

          <Link
            to="/add-card"
            className="focus:outline-none my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Card
          </Link>
        </div>
      </div>
    </div>
  );
}
