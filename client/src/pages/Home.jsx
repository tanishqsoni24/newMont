import React from "react";
import cr1 from "../../src/components/Images/crousel1.jpg";
import cr2 from "../../src/components/Images/crousel2.jpg";
import cr3 from "../../src/components/Images/b1.jpg";
import { useState } from "react";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../components/general/Card";
import "../App.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export default function Home() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

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

  useEffect(() => {
    // Check if the page is being reloaded
    const isReloaded = performance.navigation.type === 1;

    // If it's a reload, scroll to the top section
    if (isReloaded) {
      const topSection = document.getElementById("top");
      if (topSection) {
        window.scrollTo({
          top: topSection.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <div id="top" className="carousel-container mt-20">
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
          <div className="item p-2 m-8 cursor-pointer " onClick={showPopup}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/telegram-app.png" alt="telegram-app"/>
            <p>Telegram</p>
          </div>
          <div className="item p-2 m-8 cursor-pointer" onClick={showWPopup}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/whatsapp--v1.png" alt="whatsapp--v1"/>
            <p>Whatsapp</p>
          </div>
        </div>
        <div className="second">
         <Link to="/vip">
          <div className="item p-2 m-8 cursor-pointer">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/crown.png" alt="crown"/>
            <p>VIP User</p>
          </div>
          </Link>
          <Link to="/team">
          <div className="item p-2 m-8 cursor-pointer">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/conference-call--v1.png" alt="conference-call--v1"/>
            <p>My Team</p>
          </div>
          </Link>
        </div>
        {isPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-20">
            <img
              onClick={closePopup}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC"
              alt=".."
            />
            <div className=" p-9 bg-[#DEF7EC] rounded-lg shadow-md ">
            <img className="m-auto" width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/telegram-app.png" alt="telegram-app"/>
              <p className="font-bold pb-3 pl-9 pr-9 justify-self-center">
                Telegram
              </p>
              <button className="mt-4 px-5 py-2 md:ml-5 ml-5 bg-[#057A55] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out ">
                Join Now
              </button>
            </div>
          </div>
        )}
        {isWPopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <img
              onClick={closeWPopup}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC"
              alt=".."
            />
            <div className=" p-9 bg-[#DEF7EC] rounded-lg shadow-md ">
            <img className="m-auto" width="50" height="50" src="https://img.icons8.com/ios/50/0E9F6E/whatsapp--v1.png" alt="whatsapp--v1"/>
              <p className="font-bold pb-3 pl-9 pr-9 justify-self-center">
                Whatsapp
              </p>
              <button className="mt-4 px-8 py-2 md:ml-3 ml-5  bg-[#057A55] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out ">
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
        <hr />
        <ul className="flex justify-around my-5 ">
          <li
            onClick={() => scrollToSection("upgrade")}
            className="cursor-pointer   hover:text-[#0E9F6E] text-2xl font-light transition-colors 150ms ease-in-out"
          >
            Upgrade
          </li>
          <li
            onClick={() => scrollToSection("exclusive")}
            className="  cursor-pointer hover:text-[#0E9F6E] text-2xl font-light transition-colors 150ms ease-in-out"
          >
            Exclusive
          </li>
          <li
            onClick={() => scrollToSection("gift")}
            className="cursor-pointer  hover:text-[#0E9F6E] text-2xl font-light transition-colors 150ms ease-in-out"
          >
            Gift
          </li>
        </ul>
        <hr />
      </div>

      {/* Container for the cards */}
      <div className="container mx-auto mt-8 md:ml-0">
        {/* Flex row for the cards */}

        <div id="upgrade" className="flex upgrade flex-wrap md:ml-9">
          {/* Set the width of each card for large screens */}
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="24,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="15,223"
              rate="4.3"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="71,223"
              rate="4.1"
              src="https://source.unsplash.com/800x600/?coal"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.7"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine "
              days="45"
              daily="240"
              total="40000"
              price="45,223"
              rate="4.9"
              src="https://source.unsplash.com/800x600/?workers"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="62,323"
              rate="5.0"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="22,423"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?mines"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="90,623"
              rate="4.1 "
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
        </div>
        <div id="exclusive" className="head my-11 ">
          <p className="text-center font-light text-2xl text-[#014737]">
            EXCLUSIVE
          </p>
          <hr />
        </div>
        <div className="flex upgrade flex-wrap md:ml-9">
          {/* Set the width of each card for large screens */}
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="24,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="15,223"
              rate="4.3"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="71,223"
              rate="4.1"
              src="https://source.unsplash.com/800x600/?coal"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.7"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine "
              days="45"
              daily="240"
              total="40000"
              price="45,223"
              rate="4.9"
              src="https://source.unsplash.com/800x600/?workers"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="62,323"
              rate="5.0"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="22,423"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?mines"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="90,623"
              rate="4.1 "
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
        </div>
        <div id="gift" className="head my-11">
          <p className="text-center font-light text-2xl text-[#014737]">GIFT</p>
          <hr />
        </div>

        <div className="flex upgrade flex-wrap md:ml-9">
          {/* Set the width of each card for large screens */}
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="24,223"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="15,223"
              rate="4.3"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="71,223"
              rate="4.1"
              src="https://source.unsplash.com/800x600/?coal"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="34,223"
              rate="4.7"
              src="https://source.unsplash.com/800x600/?worker"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine "
              days="45"
              daily="240"
              total="40000"
              price="45,223"
              rate="4.9"
              src="https://source.unsplash.com/800x600/?workers"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
              days="45"
              daily="240"
              total="40000"
              price="62,323"
              rate="5.0"
              src="https://source.unsplash.com/800x600/?office"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Iron Mine"
              days="45"
              daily="240"
              total="40000"
              price="22,423"
              rate="4.5"
              src="https://source.unsplash.com/800x600/?mines"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Silver Mine"
              days="45"
              daily="240"
              total="40000"
              price="90,623"
              rate="4.1 "
              src="https://source.unsplash.com/800x600/?work"
            />
          </div>
          <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
            <Card
              desc="Gold Mine"
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
