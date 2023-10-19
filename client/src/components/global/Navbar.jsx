import React from "react";
import logo from "../Images/pngwing.com.png";
import "../../App.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-20 mr-2" alt="Flowbite Logo" />
          <span className="self-center text-2xl col-p md:text-3xl font-bold whitespace-nowrap dark:text-[#0E9F6E]">
            My Gold Malls
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-[#0E9F6E] dark:focus:ring-gray-100"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 ${isMenuOpen ? "transform rotate-90" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full ${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={` block py-2 pl-3 pr-4 text-black col-p text-lg rounded md:bg-transparent  md:p-0 ${
                  location.pathname === "/" ? "md:dark:text-[#0E9F6E]" : ""
                } `}
                aria-current="page"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <Link to="/task">
              <li
                onClick={closeMenu}
                className={`block py-2 pl-3 pr-4 text-black rounded col-p text-lg ${
                  location.pathname === "/task" ? "md:dark:text-[#0E9F6E]" : ""
                } hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Task
              </li>
            </Link>
            <Link to="/team">
              <li
                onClick={closeMenu}
                className={`block py-2 pl-3 pr-4 text-black rounded col-p text-lg ${
                  location.pathname === "/Team" ? "md:dark:text-[#0E9F6E]" : ""
                } hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Team
              </li>
            </Link>

            <Link to="/profile">
              <li
                onClick={closeMenu}
                className={`block py-2 pl-3 pr-4 text-black rounded col-p text-lg ${
                  location.pathname === "/profile" ? "md:dark:text-[#0E9F6E]" : ""
                } hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                My profile
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
