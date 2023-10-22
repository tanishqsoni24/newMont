import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isNavItemActive = (path) => {
    // Check if the current route matches the path of the navigation item
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#00032c] dark:bg-white fixed w-full z-20 rounded-t-3xl -bottom-1 left-0 border-b border-gray-200">
      <div className="max-w-full flex flex-wrap items-center justify-between ml-5 md:ml-0 p-1 md:p-3">
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex bg-[#00032c] flex-row px-4 ml-0 md:ml-[36vw] md:p-0 mt-4 font-medium rounded-xl  md:flex-row md:space-x-8 md:mt-0 border-0 ">
            <li className="mx-4">
              <Link
                to="/"
                className={`block py-3 pl-3 pr-3 text-black col-p text-lg rounded ${
                  isNavItemActive("/") ? "bg-blue-800 rounded-full" : ""
                } `}
                aria-current="page"
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png" alt="home"/>
              </Link>
            </li>
            <Link to="/task">
              <li
                className={`block py-3 pl-3 pr-3 mx-3 text-black col-p text-lg ${
                  isNavItemActive("/task") ? "bg-blue-800 rounded-full" : ""
                }  dark:text-black dark:hover:bg-transparent dark:hover:text-white dark-border-gray-700 transition-colors duration-200 ease-in-out`}
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/48/ffffff/task.png" alt="task" />
              </li>
            </Link>
            <Link to="/team">
              <li
                className={`block py-3 mx-3 pl-3 pr-3 text-black rounded col-p text-lg ${
                  isNavItemActive("/team") ? "bg-blue-800 rounded-full" : ""
                }  dark:text-black dark:hover-bg-transparent dark:hover-text-white dark-border-gray-700 transition-colors duration-200 ease-in-out`}
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/48/ffffff/user-group-man-woman.png" alt="user-group-man-woman" />
              </li>
            </Link>
            <Link to="/profile">
              <li
                className={`block py-3 mx-3 pl-3 pr-3 text-black rounded col-p text-lg ${
                  isNavItemActive("/profile") ? "bg-blue-800 rounded-full" : ""
                }  dark-text-black dark-hover-bg-transparent dark-hover-text-white  dark-border-gray-700 transition-colors duration-200 ease-in-out`}
              >
                <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/ffffff/gender-neutral-user.png" alt="gender-neutral-user" />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
