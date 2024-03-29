import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export default function Team() {
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color");
    };
  }, []);
  const [user, setUser] = useState({
    invite_code: "",
  });

  const [level_1, setLevel_1] = useState([]);
  const [level_2, setLevel_2] = useState([]);
  const [level_3, setLevel_3] = useState([]);

  const [team_size, setTeam_size] = useState(0);
  const [team_recharge, setTeam_recharge] = useState(0);
  const [withdrawls, setWithdrawls] = useState(0);
  useEffect(() => {
    const userDeatil = async () => {
      const token = Cookies.get("session_id");
      const decoded = await jwt_decode(token);
      //(decoded);

      // generate a link for the user to share

      setUser({
        invite_code: `https://stinghike.com/signup?invite_code=${decoded.invite_code}`,
      });
      const response = await axios.post(
        "https://stinghike.com/api/accounts/my-teams/",
        { phone_number: decoded.phone_number },
        { content: "application/json" }
      );
      //(response.data.myteams.level_1);
      //(response.data.myteams.level_2);
      //(response.data.myteams.level_3);
      setLevel_1(response.data.myteams.level_1);
      setTeam_size(response.data.team_size);
      setTeam_recharge(response.data.team_recharge);
      setWithdrawls(response.data.team_withdrawal);
      setLevel_2(response.data.myteams.level_2);
      setLevel_3(response.data.myteams.level_3);
    };

    userDeatil();
  }, []);
  const [copy, setCopy] = useState("Copy Code");
  const handelCopy = () => {
    setCopy("Copied...");

    navigator.clipboard.writeText(user.invite_code);
    // another way of copy the code

    setTimeout(() => {
      setCopy("Copy Code");
    }, 2000);
  };
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <h2 className="mb-5 mx-1 text-3xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white">
          My Team
        </h2>
      </div>
      <div className="md:w-5/6 w-full mx-auto">
        <div className="border mx-3 py-4 border-gray-200 rounded-lg shadow  bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="teamRecharge flex flex-col item-center justify-center">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              ₹{team_recharge}.00
            </h2>
            <p>Team Recharge</p>
          </div>
          <div className="teamSize flex flex-col item-center justify-center">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {team_size}
            </h2>
            <p>Team Size</p>
          </div>
        </div>
        <h2 className="mb-2 mx-3 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white">
          Invitation Code
        </h2>
        <div className="border  bg-white mx-3 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-6 mx-3">
            <label
              for="success"
              className="block mb-2 text-sm font-medium text-[#00032c] dark:text-[#00032c]"
            >
              Invite now
            </label>
            <input
              type="text"
              disabled
              id="success"
              className="bg-[#d4d7fb] border border-[#626481] text-[#00032c] dark:text[#00032c] placeholder-[#00032c] dark:placeholder-[#00032c] text-sm rounded-lg focus:ring-[#d4d7fb] focus:border-[#d4d7fb] block w-full p-2.5 dark:bg-gray-700 dark:border-[#d4d7fb]"
              placeholder={user.invite_code}
            />
          </div>
          <button
            type="button"
            className="focus:outline-none text-white mx-3 bg-[#00032c] hover:bg-[#4951b7] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            onClick={handelCopy}
          >
            {copy}
          </button>
        </div>
        <h2 className="mb-2 mx-3 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white">
          Team Members
        </h2>

        <div className="relative  bg-white overflow-x-auto rounded-xl mb-11 mx-1">
          {level_1.length > 0 ? (
            <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <tbody>
                {level_1.length > 0 &&
                  level_1.map((member, index) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          1st
                        </th>
                        <td className="px-6 py-4">{member}</td>
                        <td className="px-6 py-4 flex">
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                {level_2.length > 0 &&
                  level_2.map((member, index) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          2nd
                        </th>
                        <td className="px-6 py-4">{member}</td>
                        <td className="px-6 py-4 flex">
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                {level_3.length > 0 &&
                  level_3.map((member, index) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          3rd
                        </th>
                        <td className="px-6 py-4">{member}</td>
                        <td className="px-6 py-4 flex">
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p className="text-lg text-center body-bg-color">No Team Member</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
