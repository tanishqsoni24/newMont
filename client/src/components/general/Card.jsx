import React from "react";
import { useState } from "react";
import '../../App.css';
import { CSSTransition } from "react-transition-group";
import "../../pages/animate.css";
import axios from "axios";
export default function Card(props) {

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




    // if elegible

    // purchase

    const purchase = await axios.post("http://localhost:8000/dasboard/purchase", props.id , {"content": "application/json"});

  }


  return (
    <div className="w-full max-w-sm m-1 bg-white my-5 border  dark:bg-white dark:border dark:border-gray-100">
      <a  onClick={showPopup}>
        
        <img
        
          className="p-3   "
          src={props.src}
          alt="product"
        />
      </a>
      <div className="px-5 pb-5">
        <a  onClick={showPopup}>
          <h5 className="text-xl font-thin tracking-tight text-gray-900 p-2 dark:text-[#0E9F6E]">
            {props.desc}
          </h5>
          <h5 className="text-lg font-thin tracking-tight text-gray-900 p-1 dark:text-[#0E9F6E]">
             Days: {props.days}
          </h5>
          <h5 className="text-lg font-thin tracking-tight text-gray-900 p-1 dark:text-[#0E9F6E]">
            Daily Income: ₹{props.daily}
          </h5>
          <h5 className="text-lg font-thin tracking-tight text-gray-900 p-1 dark:text-[#0E9F6E]">
            Total Income :₹{props.total}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <svg
            className="w-4 h-4 text-[#0E9F6E] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#0E9F6E] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#0E9F6E] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#0E9F6E] mr-1"
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
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-white dark:text-black ml-3">
            {props.rate}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <span className=" ml-7 md:ml-0 text-lg md:text-3xl font-thin col-p text-gray-900 dark:text-[#0E9F6E]">
          ₹{props.total}
          </span>
          <a
            onClick={showPopup}
            className="text-[#0E9F6E] ml-4 hover:text-black focus:ring-4 focus:outline-none font-medium border border-[#0E9F6E] text-sm px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-[#0E9F6E] hover:cursor:pointer "
          >
            Purchase
          </a>
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
          <img onClick={closePopup} className="-mx-9"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC" alt=".." />
          </div>
          <div className=" p-9 bg-[#DEF7EC] rounded-lg shadow-md ">
          <p className="text-center text-xl font-semibold text-black" >Good Details</p>
          <div className="contain p-3 mt-7 bg-white rounded-lg ">
            <img className="w-32 rounded-lg " src={props.src} alt="" />
            <p className="pt-3" >{props.desc}</p>
            <p>₹{props.price}</p>
          </div>
          <p className="text-center text-xl font-semibold text-black mt-7" >Income Details</p>
          <div className="contain p-3 mt-7 bg-white rounded-lg">

            <p >VIP: {props.vip}</p>
            <p >Days: {props.days}</p>
            <p >Daily Income : ₹{props.daily}</p>
            <p >Total Income : ₹{props.total}</p>
          </div>
          
            <button 
            onClick={handlepurchase} 
              className="mt-4 py-2 px-11 md:px-32 bg-[#057A55] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out "
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
