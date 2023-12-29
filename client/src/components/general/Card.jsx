import React from "react";
import { useState } from "react";
import "../../App.css";
import { CSSTransition } from "react-transition-group";
import "../../pages/animate.css";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

export default function Card(props) {
  const [isAlert, setIsAlert] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlepurchase = async () => {
    setIsPopupOpen(false);

    // check wallet balance elegible for purchase

    const token = Cookies.get("session_id");
    const decoded = await jwt_decode(token);

    const response = await axios.post(
      "https://mygoldmalls.com/api/dashboard/purchase_product/",
      { phone_number: decoded.phone_number, product_id: props.id },
      { content: "application/json" }
    );

    //(response.data);

    if (response.data.status === "Success") {
      setIsAlert("Product Purchased Successfully");

      // if elegible

      // purchase
    } else {
      setIsAlert(response.data.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isAlert]);

  return (
    <div className="w-full max-w-sm m-1 rounded-2xl  bg-white mt-0 mb-11 border  dark:bg-white dark:border dark:border-gray-100">
      <a onClick={showPopup}>
        {isAlert && (
          <div
            id="toast-default"
            style={{
              position: "fixed",
              top: "13%",
              right: "5px",
            }}
            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"></div>
            <div className="ml-3 text-sm font-normal">{isAlert}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-default"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}

        <img className="p-3 rounded-3xl " src={props.src} alt="product" />
      </a>
      <div className="px-5 pb-1">
        <a onClick={showPopup}>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 p-0 dark:text-[#00032c]">
            {props.desc}
          </h5>
          <h5 className="text-sm tracking-tight text-gray-900 p-0 dark:text-[#00032c]">
            Days: {props.days}
          </h5>
          <h5 className="text-sm tracking-tight text-gray-900 p-0 dark:text-[#00032c]">
            Daily Income: ₹{props.daily}
          </h5>
          <h5 className="text-sm tracking-tight text-gray-900 p-0 dark:text-[#00032c]">
            Total Income :₹{props.total}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <svg
            className="w-4 h-4 text-[#00032c] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#00032c] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#00032c] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#00032c] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2   rounded dark:bg-white dark:text-black ml-3">
            {props.rate}
          </span>
        </div>
        <div className="flex flex-row mb-3 ">
          <span className=" md:ml-0 text-sm md:text-3xl font-bold text-[#353d95]">
            ₹{props.price}
          </span>
          <span className="text-slate-600 text-sm md:text-xl">
            /₹{props.total}
          </span>
        </div>
      </div>
      <CSSTransition
        in={isPopupOpen}
        timeout={300} // Adjust the duration as needed
        classNames="popup" // Use a class name of your choice
        unmountOnExit
      >
        <div>
          {isPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20">
              <div className="flex w-96 justify-end">
                 <img
                onClick={closePopup}
                width="20"
                height="20"
                className="mx-12 cursor-pointer "
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="delete-sign"
              />
              </div>
              <div className=" p-9 bg-[#e0e8ff] rounded-lg shadow-md ">
                <p className="text-center text-xl font-semibold text-black">
                  Good Details
                </p>
                <div className="contain p-3 mt-7 bg-white rounded-lg ">
                  <img className="w-32 rounded-lg " src={props.src} alt="" />
                  <p className="pt-3">{props.desc}</p>
                  <p>₹{props.price}</p>
                </div>
                <p className="text-center text-xl font-semibold text-black mt-7">
                  Income Details
                </p>
                <div className="contain p-3 mt-7 bg-white rounded-lg">
                  <p>VIP: {props.vip}</p>
                  <p>Days: {props.days}</p>
                  <p>Daily Income : ₹{props.daily}</p>
                  <p>Total Income : ₹{props.total}</p>
                </div>

                <button
                  onClick={handlepurchase}
                  className="mt-4 py-2 px-11 md:px-32 bg-[#00032c] text-white rounded-3xl hover:bg-[#343983] transition-colors 100ms ease-in-out "
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
