
import React from "react";
import cr1 from "../../src/components/Images/crousel1.jpg";
import cr2 from "../../src/components/Images/crousel2.jpg";
import cr3 from "../../src/components/Images/b1.jpg";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../components/general/Card";
import "../App.css";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isWPopupOpen, setIsWPopupOpen] = useState(false);

  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const showWPopup = () => {
    setIsWPopupOpen(true);
  };

  const closeWPopup = () => {
    setIsWPopupOpen(false);
  };

  return (
    <div className="carousel-container mt-20">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        renderIndicator={(clickHandler, isSelected, index, label) => (
          <div
            onClick={clickHandler}
            className={`inline-block h-1 w-10 mx-2 rounded-full cursor-pointer ${
              isSelected ? "bg-[#0E9F6E]" : "bg-gray-300"
            }`}
            key={index}
            title={label}
          ></div>
        )}
      >
        <div>
          <img src={cr2} alt="Slide 1" />
        </div>
        <div>
          <img src={cr1} alt="Slide 2" />
        </div>
        <div>
          <img src={cr3} alt="Slide 3" />
        </div>
      </Carousel>

      <div className="container flex justify-center bg-[#F3FAF7] rounded-lg">
        <div className="first">
          <div className="item p-8  " onClick={showPopup} >
            <svg
              className="w-12"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="telegram"
            >
              <path d="M11.99432,2a10,10,0,1,0,10,10A9.99917,9.99917,0,0,0,11.99432,2Zm3.17951,15.15247a.70547.70547,0,0,1-1.002.3515l-2.71467-2.10938L9.71484,17.002a.29969.29969,0,0,1-.285.03894l.334-2.98846.01069.00848.00683-.059s4.885-4.44751,5.084-4.637c.20147-.189.135-.23.135-.23.01147-.23053-.36152,0-.36152,0L8.16632,13.299l-2.69549-.918s-.414-.1485-.453-.475c-.041-.324.46649-.5.46649-.5l10.717-4.25751s.881-.39252.881.25751Z"></path>
            </svg>
            <p>Telegram</p>
          </div>
          <div className="item p-8" onClick={showWPopup}>
            <svg
              className="w-12"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="whatsapp"
            >
              <path d="M22,6.55a12.61,12.61,0,0,0-.1-1.29,4.29,4.29,0,0,0-.37-1.08,3.66,3.66,0,0,0-.71-1,3.91,3.91,0,0,0-1-.71,4.28,4.28,0,0,0-1.08-.36A10.21,10.21,0,0,0,17.46,2H6.55a12.61,12.61,0,0,0-1.29.1,4.29,4.29,0,0,0-1.08.37,3.66,3.66,0,0,0-1,.71,3.91,3.91,0,0,0-.71,1,4.28,4.28,0,0,0-.36,1.08A10.21,10.21,0,0,0,2,6.54C2,6.73,2,7,2,7.08v9.84c0,.11,0,.35,0,.53a12.61,12.61,0,0,0,.1,1.29,4.29,4.29,0,0,0,.37,1.08,3.66,3.66,0,0,0,.71,1,3.91,3.91,0,0,0,1,.71,4.28,4.28,0,0,0,1.08.36A10.21,10.21,0,0,0,6.54,22H17.45a12.61,12.61,0,0,0,1.29-.1,4.29,4.29,0,0,0,1.08-.37,3.66,3.66,0,0,0,1-.71,3.91,3.91,0,0,0,.71-1,4.28,4.28,0,0,0,.36-1.08A10.21,10.21,0,0,0,22,17.46c0-.19,0-.43,0-.54V7.08C22,7,22,6.73,22,6.55ZM12.23,19h0A7.12,7.12,0,0,1,8.8,18.1L5,19.1l1-3.72a7.11,7.11,0,0,1-1-3.58A7.18,7.18,0,1,1,12.23,19Zm0-13.13A6,6,0,0,0,7.18,15l.14.23-.6,2.19L9,16.8l.22.13a6,6,0,0,0,3,.83h0a6,6,0,0,0,6-6,6,6,0,0,0-6-6Zm3.5,8.52a1.82,1.82,0,0,1-1.21.85,2.33,2.33,0,0,1-1.12-.07,8.9,8.9,0,0,1-1-.38,8,8,0,0,1-3.06-2.7,3.48,3.48,0,0,1-.73-1.85,2,2,0,0,1,.63-1.5.65.65,0,0,1,.48-.22H10c.11,0,.26,0,.4.31s.51,1.24.56,1.33a.34.34,0,0,1,0,.31,1.14,1.14,0,0,1-.18.3c-.09.11-.19.24-.27.32s-.18.18-.08.36a5.56,5.56,0,0,0,1,1.24,5,5,0,0,0,1.44.89c.18.09.29.08.39,0s.45-.52.57-.7.24-.15.4-.09,1.05.49,1.23.58.29.13.34.21A1.56,1.56,0,0,1,15.73,14.36Z"></path>
            </svg>
            <p>Whatsapp</p>
          </div>
        </div>
        <div className="second">
          <div className="item p-8" >
            <svg
              className="w-12"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              data-name="Layer 2"
              id="crown"
            >
              <path d="M34.43 36H13.57a3.33 3.33 0 0 1-3.31-2.89L8 16.43a2 2 0 0 1 3.35-1.73l3.73 3.45A2 2 0 0 0 18 18l4.46-5.26a2 2 0 0 1 3.06 0L30 18a2 2 0 0 0 2.89.17l3.73-3.45A2 2 0 0 1 40 16.43L37.74 33.1a3.33 3.33 0 0 1-3.31 2.9Z"></path>
            </svg>
            <p>VIP User</p>
          </div>
          <div className="item p-8" >
            <svg
              className="w-12"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 64 64"
              viewBox="0 0 64 64"
              id="team"
            >
              <path
                d="M52.7,36.3c-1-0.3-1.9-0.6-2.5-0.9c0,0,0,0,0,0c3.4-2.7,5.8-7.2,5.8-13.3C56,15.4,50.5,10,43.8,10c-1-5.8-6-10-11.8-10
	c-5.8,0-10.7,4.3-11.8,10C13.5,10,8,15.4,8,21.9c0,5.1,2.1,10.4,5.8,13.4c0,0-0.1,0.1-0.1,0.1c-0.6,0.3-1.5,0.6-2.4,0.9
	C7.1,37.7,0,40.1,0,48.3v5.4c0,1.1,0.9,2,2,2h6.2C8.1,56.4,8,57.2,8,58v4c0,1.1,0.9,2,2,2h44c1.1,0,2-0.9,2-2v-4
	c0-0.8-0.1-1.6-0.2-2.3H62c1.1,0,2-0.9,2-2v-5.4C64,40.1,56.9,37.7,52.7,36.3z M52,22.1c0,5-2.6,10.4-7,11.6c0.6-2.1,1-4.3,1-6.7
	c0-5-2.6-9.4-6.6-11.8c1.3-0.7,2.8-1.2,4.3-1.2C48.3,14,52,17.6,52,22.1z M22,27c0-5.5,4.5-10,10-10s10,4.5,10,10c0,7.4-5,15-10,15
	S22,34.4,22,27z M32,4c3.8,0,7.1,2.8,7.8,6.6c-1.7,0.6-3.3,1.5-4.7,2.7c-1-0.2-2.1-0.4-3.1-0.4c-1.1,0-2.1,0.1-3.1,0.4
	c-1.3-1.2-2.9-2.2-4.7-2.7C24.9,6.8,28.2,4,32,4z M12,21.9c0-4.4,3.7-7.9,8.3-7.9c1.5,0,3,0.4,4.3,1.2C20.6,17.6,18,22,18,27
	c0,2.4,0.4,4.6,1,6.7C14.6,32.4,12,27,12,21.9z M4,51.7v-3.4c0-4.9,3.7-6.6,8.6-8.2c1.1-0.4,2.1-0.7,2.9-1.1
	c0.8-0.4,1.5-0.9,2.1-1.6c1,0.3,2.1,0.5,3.3,0.6c1.1,1.9,2.4,3.6,3.9,4.9c-0.2,0.1-0.4,0.2-0.6,0.3c-0.7,0.3-1.8,0.7-3,1.1
	c-3.6,1.2-8.9,2.9-11.5,7.4H4z M60,51.7h-5.6c-2.6-4.4-7.6-6.1-10.7-7.1c-1.1-0.3-2.2,0.2-2.5,1.3c-0.3,1,0.2,2.2,1.3,2.5
	c5.1,1.7,9.6,3.7,9.6,9.6v2H12v-2c0-6,4.5-8,10.4-9.9c1.4-0.4,2.5-0.8,3.4-1.3c0.9-0.4,1.7-1,2.3-1.7c1.3,0.6,2.6,0.9,3.9,0.9
	c4.1,0,8.4-3.1,11.2-8c1.1,0,2.2-0.2,3.3-0.6c0.6,0.7,1.3,1.2,2.1,1.6c0.8,0.4,1.8,0.7,2.9,1.1c4.8,1.6,8.6,3.3,8.6,8.2V51.7z"
              ></path>
            </svg>
            <p>Team</p>
          </div>
        </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-20">
          <img onClick={closePopup}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC" alt=".." />
          <div className=" p-9 bg-[#DEF7EC] rounded-lg shadow-md ">
          <svg
              className="w-12 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="telegram"
            >
              <path d="M11.99432,2a10,10,0,1,0,10,10A9.99917,9.99917,0,0,0,11.99432,2Zm3.17951,15.15247a.70547.70547,0,0,1-1.002.3515l-2.71467-2.10938L9.71484,17.002a.29969.29969,0,0,1-.285.03894l.334-2.98846.01069.00848.00683-.059s4.885-4.44751,5.084-4.637c.20147-.189.135-.23.135-.23.01147-.23053-.36152,0-.36152,0L8.16632,13.299l-2.69549-.918s-.414-.1485-.453-.475c-.041-.324.46649-.5.46649-.5l10.717-4.25751s.881-.39252.881.25751Z"></path>
            </svg>
            <p className="font-bold pb-3 pl-9 pr-9 justify-self-center" >Telegram</p>
            <button
              className="mt-4 px-5 py-2 md:ml-5 ml-5 bg-[#057A55] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out "
            >
              Join Now
            </button>
          </div>
        </div>
      )}
      {isWPopupOpen && (
        <div id='pop' className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-20">
          <img onClick={closeWPopup} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC" alt=".." />
          <div className=" p-9 bg-[#DEF7EC] rounded-lg shadow-md ">
          <svg
              className="w-12 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="whatsapp"
            >
              <path d="M22,6.55a12.61,12.61,0,0,0-.1-1.29,4.29,4.29,0,0,0-.37-1.08,3.66,3.66,0,0,0-.71-1,3.91,3.91,0,0,0-1-.71,4.28,4.28,0,0,0-1.08-.36A10.21,10.21,0,0,0,17.46,2H6.55a12.61,12.61,0,0,0-1.29.1,4.29,4.29,0,0,0-1.08.37,3.66,3.66,0,0,0-1,.71,3.91,3.91,0,0,0-.71,1,4.28,4.28,0,0,0-.36,1.08A10.21,10.21,0,0,0,2,6.54C2,6.73,2,7,2,7.08v9.84c0,.11,0,.35,0,.53a12.61,12.61,0,0,0,.1,1.29,4.29,4.29,0,0,0,.37,1.08,3.66,3.66,0,0,0,.71,1,3.91,3.91,0,0,0,1,.71,4.28,4.28,0,0,0,1.08.36A10.21,10.21,0,0,0,6.54,22H17.45a12.61,12.61,0,0,0,1.29-.1,4.29,4.29,0,0,0,1.08-.37,3.66,3.66,0,0,0,1-.71,3.91,3.91,0,0,0,.71-1,4.28,4.28,0,0,0,.36-1.08A10.21,10.21,0,0,0,22,17.46c0-.19,0-.43,0-.54V7.08C22,7,22,6.73,22,6.55ZM12.23,19h0A7.12,7.12,0,0,1,8.8,18.1L5,19.1l1-3.72a7.11,7.11,0,0,1-1-3.58A7.18,7.18,0,1,1,12.23,19Zm0-13.13A6,6,0,0,0,7.18,15l.14.23-.6,2.19L9,16.8l.22.13a6,6,0,0,0,3,.83h0a6,6,0,0,0,6-6,6,6,0,0,0-6-6Zm3.5,8.52a1.82,1.82,0,0,1-1.21.85,2.33,2.33,0,0,1-1.12-.07,8.9,8.9,0,0,1-1-.38,8,8,0,0,1-3.06-2.7,3.48,3.48,0,0,1-.73-1.85,2,2,0,0,1,.63-1.5.65.65,0,0,1,.48-.22H10c.11,0,.26,0,.4.31s.51,1.24.56,1.33a.34.34,0,0,1,0,.31,1.14,1.14,0,0,1-.18.3c-.09.11-.19.24-.27.32s-.18.18-.08.36a5.56,5.56,0,0,0,1,1.24,5,5,0,0,0,1.44.89c.18.09.29.08.39,0s.45-.52.57-.7.24-.15.4-.09,1.05.49,1.23.58.29.13.34.21A1.56,1.56,0,0,1,15.73,14.36Z"></path>
            </svg>
            <p className="font-bold pb-3 pl-9 pr-9 justify-self-center" >Whatsapp</p>
            <button
              className="mt-4 px-4 py-2 md:ml-5 ml-5 bg-[#057A55] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out "
            >
              Join Now
            </button>
          </div>
        </div>
      )}
      </div>



      <h2 className="text-[#0E9F6E] text-center col-p m-7 md:text-4xl text-3xl">
        Start Investing Today!
      </h2>


        <div className="card-nav mt-24 ">
          <ul className="flex justify-around  " >
            <li className="cursor-pointer hover:text-[#0E9F6E] text-xl transition-colors 150ms ease-in-out" >Upgrade</li>
            <li className="cursor-pointer hover:text-[#0E9F6E] text-xl transition-colors 150ms ease-in-out"  >Exclusive</li>
            <li className="cursor-pointer hover:text-[#0E9F6E]  text-xl transition-colors 150ms ease-in-out" >Gift</li>
          </ul>
        </div>


      {/* Container for the cards */}
      <div className="container mx-auto mt-8 ml-2 md:ml-0">
        {/* Flex row for the cards */}
        <div className="flex flex-wrap md:ml-9">
          {/* Set the width of each card for large screens */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="women jewellery 24 carat gold/silver"
              days="45"
              daily="240"
              total="40000"
              price="24,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Necklace for women gold and silver"
              days="45"
              daily="240"
              total="40000"
              price="15,223"
              rate="4.3"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Earrings for women parties/dinner"
              days="45"
              daily="240"
              total="40000"
              price="71,223"
              rate="4.1"
              src="https://source.unsplash.com/800x600/?coal"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="rings for women gold/silver 24 carrat"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.7"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="eligent Nose pirecing for women "
              days="45"
              daily="240"
              total="40000"
              price="45,223"
              rate="4.9"
              src="https://source.unsplash.com/800x600/?workers"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Bracelets for women 'S' series silver"
              days="45"
              daily="240"
              total="40000"
              price="62,323"
              rate="5.0"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="stylish earrings for women at New Mont"
              days="45"
              daily="240"
              total="40000"
              price="22,423"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?mines"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="women jewellery 24 carat gold/silver"
              days="45"
              daily="240"
              total="40000"
              price="90,623"
              rate="4.1 "
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="women jewellery 24 carat gold/silver"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
