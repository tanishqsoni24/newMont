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
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./animate.css";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession_id = async () => {
      const token = Cookies.get("session_id");
      if (!token) {
        navigate("/login");
      } 
    };
    checkSession_id();
  }, []);

  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add('body-bg-color');
  
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('body-bg-color');
    };
  }, []);
  const [exclusive, setExclusive] = useState([]);
  const [upgrade, setUpgrade] = useState([]);
  const [gift, setGift] = useState([]);
  useEffect(() => {

    const fetching = async () => {
      const response = await axios.get("http://139.59.32.207/dashboard/all_products/");
      //(response.data);
      setExclusive(response.data.exclusive_product_details);
      setUpgrade(response.data.upgrade_product_details);
      setGift(response.data.gift_product_details);
    }
    fetching();
  }, [])

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
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(true);
  const [isWPopupOpen, setIsWPopupOpen] = useState(false);
  const [isexclusive, setIsExclusive] = useState(false);
  const [isupgrade, setIsUpgrade] = useState(true);
  const [isgift, setIsGift] = useState(false);
  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const closemainPopup = () => {
    setIsMainPopupOpen(false);
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
    <div id="top" className="carousel-container bg-[#e0e8ff]">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        renderIndicator={(clickHandler, isSelected, index, label) => (
          <div
            onClick={clickHandler}
            className={`inline-block h-1 w-10 mx-2 rounded-full cursor-pointer ${
              isSelected ? "bg-[#00032c]" : "bg-gray-300"
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
      <CSSTransition
          in={isMainPopupOpen}
          timeout={300} // Adjust the duration as needed
          classNames="popup" // Use a class name of your choice
          unmountOnExit
        >
      <div>
      {isMainPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20">
          <div
            style={{ width: "20rem" }}
            className="flex flex-col justify-center items-end"
          >
            <img
              onClick={closemainPopup}
              width="20"
              height="20"
              className="mb-1 cursor-pointer "
              src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
              alt="delete-sign"
            />
          </div>
          <div
            style={{ width: "20rem" }}
            className=" p-9 bg-[#e0e8ff] rounded-lg shadow-md "
          >
            <h3 className="font-bold text-xl text-black text-center mb-7">
              Announcement
            </h3>
            <p>
              1.Notice: Newmont Mining APP will be officially launched on
              10/1/2023.
            </p>
            <p>
              2.Withdrawal is available when your account balance reaches 180₹
            </p>
            <p>3.Withdrawal handling fee is 3%,</p>
            <p>
              4.If recharge fails, please refresh or choose another channel.{" "}
            </p>
            <p>
              {" "}
              5.If the team recharge reaches 100,000, the reward will be 10,000.
            </p>
            <p>
              6. You can get Rs 1.5 Lakh when your team recharge reaches 5
              Lakhs.
            </p>
            <p>7.This event will only be open once.</p>
          </div>
        </div>
      )}
      </div>
      </CSSTransition>
      <div className="container flex justify-center bg-[#e0e8ff] rounded-lg">
        <div className="first">
          <div className="item p-2 m-8 text-center cursor-pointer " onClick={showPopup}>
            <img
              width="50"
              height="50"
              className="ml-3  "
              src="https://img.icons8.com/ios/50/00032c/telegram-app.png"
              alt="telegram-app"
            />
            <p>Telegram</p>
          </div>
          <div className="item p-2 m-8 cursor-pointer" onClick={showWPopup}>
            <img
              width="50"
              className="ml-3"
              height="50"
              src="https://img.icons8.com/ios/50/00032c/whatsapp--v1.png"
              alt="whatsapp--v1"
            />
            <p>Whatsapp</p>
          </div>
        </div>
        <div className="second">
          <Link to="/vip">
            <div className="item p-2 m-8 cursor-pointer">
              <img
                width="50"
                height="50"
                className="ml-1"
                src="https://img.icons8.com/ios/50/00032c/crown.png"
                alt="crown"
              />
              <p>VIP User</p>
            </div>
          </Link>
          <Link to="/team">
            <div className="item p-2 m-8 cursor-pointer">
              <img
                width="50"
                className="ml-2"
                height="50"
                src="https://img.icons8.com/ios/50/00032c/conference-call--v1.png"
                alt="conference-call--v1"
              />
              <p>My Team</p>
            </div>
          </Link>
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
                <div
                  style={{ width: "14rem" }}
                  className="flex flex-col justify-center items-end"
                >
                  <img
                    onClick={closePopup}
                    width="20"
                    height="20"
                    className="mb-1 cursor-pointer "
                    src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                    alt="delete-sign"
                  />
                </div>
                <div className=" p-9 bg-[#e0e8ff] rounded-lg shadow-md">
                  <img
                    className="m-auto"
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/00032c/telegram-app.png"
                    alt="telegram-app"
                  />
                  <p className="font-bold pb-3 pl-9 pr-9 justify-self-center">
                    Telegram
                  </p>
                  <button className="mt-4 px-5 py-2 md:ml-5 ml-5 bg-[#00032c] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out">
                    Join Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>

        <CSSTransition
          in={isWPopupOpen}
          timeout={300} // Adjust the duration as needed
          classNames="popup" // Use a class name of your choice
          unmountOnExit
        >
        <div>
        {isWPopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "14rem" }}
              className="flex flex-col justify-center items-end"
            >
              <img
                onClick={closeWPopup}
                width="20"
                height="20"
                className="mb-1 cursor-pointer"
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="delete-sign"
              />
            </div>
            <div className=" p-9 bg-[#e0e8ff] rounded-lg shadow-md ">
              <img
                className="m-auto"
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/00032c/whatsapp--v1.png"
                alt="whatsapp--v1"
              />
              <p className="font-bold pb-3 pl-9 pr-9 justify-self-center">
                Whatsapp
              </p>
              <button className="mt-4 px-8 py-2 md:ml-3 ml-5  bg-[#00032c] text-white rounded-3xl hover:bg-[#03543F] transition-colors 100ms ease-in-out ">
                Join Now
              </button>
            </div>
          </div>
        )}
        </div>
        </CSSTransition>
      </div>

      <h2 className="text-[#00032c]  text-center col-p m-7 md:text-4xl text-3xl">
        All Investable Products
      </h2>

      <div className="card-nav mt-0  ">
        <ul className="flex justify-between my-0 rounded-full bg-white md:mx-9 mx-3 ">
          <li
            onClick={() => {
              setIsExclusive(false);
              setIsGift(false);
              setIsUpgrade(true);
            }}
            className={`cursor-pointer  ${
              isupgrade
                ? "text-white bg-[#00032c] rounded-full  "
                : ""
            }  text-lg md:text-2xl font-semibold pb-2 pt-2 p-5 transition-colors 150ms ease-in-out`}
          >
            Upgrade
          </li>
          <li
            onClick={() => {
              setIsExclusive(true);
              setIsGift(false);
              setIsUpgrade(false);
            }}
            className={`cursor-pointer  ${
              isexclusive
                ? "text-white bg-[#00032c] rounded-full p-5"
                : ""
            }  text-lg md:text-2xl pb-2 font-semibold pt-2 transition-colors 150ms ease-in-out`}
          >
            Exclusive
          </li>
          <li
            onClick={() => {
              setIsExclusive(false);
              setIsGift(true);
              setIsUpgrade(false);
            }}
            className={`cursor-pointer  ${
              isgift
                ? "text-white bg-[#00032c] rounded-full "
                : ""
            }   text-lg md:text-2xl pb-2 font-semibold pt-2 p-5 transition-colors 150ms ease-in-out`}
          >
            Gift
          </li>
        </ul>
      </div>

      {/* Container for the cards */}
      <div className="container mx-auto mt-8 md:ml-0">
        {/* Flex row for the cards */}
        <div
            className={`flex upgrade flex-wrap md:ml-9 ${
              isupgrade ? 'block ' : 'hidden'
            }`}
         
        >
          {/* Set the width of each card for large screens */}
          {upgrade && upgrade.map((item) => (
            <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-1 ">
              <Card
              vip={item.eligible_for_vip_number}
                desc={item.name}
                days={item.days}
                daily={item.daily_income}
                total={item.total_income}
                price={item.price}
                rate="4.5"
                id={item.id}
                src={"http://139.59.32.207"+item.image}
              />
            </div>))}
        </div>
        <div
               className={`flex upgrade flex-wrap md:ml-9 ${
                isexclusive ? 'block ' : 'hidden'
              } `}
        >
          {/* Set the width of each card for large screens */}
          {exclusive && exclusive.map((item) => (
            <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
              <Card
              vip={item.eligible_for_vip_number}
                desc={item.name}
                days={item.days}
                daily={item.daily_income}
                total={item.total_income}
                price={item.price}
                rate="4.5"
                id={item.id}
                src={"http://139.59.32.207"+item.image}
              />
            </div>))}
        </div>

        <div
           className={`flex upgrade flex-wrap md:ml-9 ${
            isgift ? ' block ' : 'hidden'
          }`}
        >
          {/* Set the width of each card for large screens */}
          {gift && gift.map((item) => (
            <div className=" w-1/2 md:w-1/3 lg:w-1/3 px-2">
              <Card
              vip={item.eligible_for_vip_number}
                desc={item.name}
                days={item.days}
                daily={item.daily_income}
                total={item.total_income}
                price={item.price}
                id={item.id}
                rate="4.5"
                src={"http://139.59.32.207"+item.image}
              />
            </div>))}
        </div>
      </div>
    </div>
  );
}
