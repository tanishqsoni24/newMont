import React, { useEffect } from "react";
import logo from "../components/Images/pngwing.com.png";
import "../App.css";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApprovalModal from "../components/general/AdminModal";
import RechargeModal from "../components/general/RechargeModal";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function AdminPortal() {
  const [reward, setReward] = useState({
    phone_number: "",
    wallet: "",
  })
  const [agent , setAgent] = useState({
    agentName: "",
    agentNumber: "",
    agentInitialWallet : "",
    agentPassword : "",
  })
  const handleRewardSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://mygoldmalls.com/api/administ/reward/",
      {
        phone_number: reward.phone_number,
        wallet: reward.wallet,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    alert(response.data.message);

    window.location.reload();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isdashboard, setDashboard] = useState(true);
  const [iswithdraw, setIsWithdraw] = useState(false);
  const [isrecharge, setIsRecharge] = useState(false);
  const [isreward, setIsReward] = useState(false);
  const [isuser, setIsUser] = useState(false);
  const [isproduct, setIsProduct] = useState(false);
  const [isagent, setIsAgent] = useState(false);
  const [isorder, setIsOrder] = useState(false);

  const navigate = useNavigate();
  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };
  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post(
      "https://mygoldmalls.com/api/administ/add_agent/",
      {
        agentName: agent.agentName,
        agentNumber: agent.agentNumber,
        agentInitialWallet : agent.agentInitialWallet,
        agentPassword : agent.agentPassword,
      },
      { headers: { "Content-Type": "application/json" } }

    );
    alert(response.data.message);

  };
  const handelDistributeIncome = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://mygoldmalls.com/api/administ/distribute_income/",
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    alert(response.data.message);
    window.location.reload();
  };

  const openRechargeModal = (item) => {
    setSelectedItem(item);
    setrechargeModalIsOpen(true);
  };

  const closeRechargeModal = () => {
    setSelectedItem(null);
    setrechargeModalIsOpen(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const handelApproveRecharge = (item) => {
    closeRechargeModal();
  };
  const handleApprove = (item) => {
    closeModal();
  };
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const [rechargePopUP, setRechargePopUP] = useState(false);
  const viewuser = (user) => {
    navigate(`/administ/viewuser/${user.user}-${user.phone_number}`);
  };
  const viewrecharge = (user) => {
    navigate(`/administ/recharge/${user.user}-${user.phone_number}`);
  };


    const dataFetch = async (e) => {
      const token = Cookies.get("admin_session_id");
      const decoded = await jwt_decode(token);
      const response = await axios.post(
        "https://mygoldmalls.com/api/administ/",
        { phone_number: decoded.phone_number },
        { content: "application/json" }
      );

      setDataArray(response.data.withdraw_records_details);
      setFakeRechargeRecords(response.data.recharge_records);
      setFakeUserData(response.data.users_details);
      setFakeProductData(response.data.products_details);
      setFakeOrders(response.data.order_details);
      setAdmin_wallet(response.data.admin_wallet);
      setUserData(response.data.users_details);
      setRechargeRecords(response.data.recharge_records);
      setWithdrawRecords(response.data.withdraw_records_details);
      const overalldata = await axios.post(
        "https://mygoldmalls.com/api/administ/all_detail/",
        {},
        { content: "application/json" }
      );
      setOverallData(overalldata.data.data);
    };
    useEffect(() => {
      dataFetch(); // Call dataFetch when the component mounts
    }, []);

  const [overallData, setOverallData] = useState({
    total_approved_recharge_records: 0,
    total_approved_withdraw_records: 0,
    total_orders: 0,
    total_orders_today: 0,
    total_pending_recharge_records: 0,
    total_pending_withdraw_records: 0,
    total_products: 0,
    total_recharge_records_today: "0000.00",
    total_users: 0,
    total_withdraw_records_today: "000.00",
  });

  const [userViaMobile, setUserViaMobile] = useState("");
  const userViaMobileHandler = (e) => {};
  const [userData, setUserData] = useState([]);
  const [rechargeRecords, setRechargeRecords] = useState([]);
  const [withdrawRecords, setWithdrawRecords] = useState([]);

  const [admin_wallet, setAdmin_wallet] = useState("0");
  const [rechargeModalIsOpen, setrechargeModalIsOpen] = useState(false);

  const [fakeRechargeRecords, setFakeRechargeRecords] = useState([
    {
      Sno: 1,
      User: "User 1",
      Amount: "$100.00",
      Status: "Paid",
      Date: "2023-10-09",
      RemainingBalance: "$2510",
    },
  ]);

  const [fakeUserData, setFakeUserData] = useState([
    {
      Sno: 1,
      Name: "User 1",
      PhoneNumber: "1234567890",
      InviteCode: "zxcvuycr5466",
      Verified: "Yes",
      StartTime: "25:00",
      RecommendedBy: "Virat Kohli",
      VIPLevel: 2,
      Wallet: "$1000",
      RechargeAmount: "$100",
      Income: "$7000",
      IsAdmin: "No",
    },
  ]);

  const [DataArray, setDataArray] = useState([
    {
      Sno: 1,
      User: "John Doe",
      Amount: "₹500",
      Status: "Paid",
      Date: "2023-10-09",
      Card: "**** **** **** 1234",
      Accountno: "1234567890",
      ifsc: "ABCD1234567",
      name: "John Doe",
    },
    // Add more fake data here as needed
  ]);
  const [fakeOrders, setFakeOrders] = useState([
    {
      sno: 1,
      user: "User 1",
      product: "Product 1",
      amount: "$100",
      date_of_purchase: "2023-10-09",
    },
  ]);
  const [fakeProductData, setFakeProductData] = useState([
    {
      Sno: 1,
      Name: "Product 1",
      Price: "$100",
      Description: "This is a description",
      Image: "https://picsum.photos/200",
    },
  ]);
  return (
    <>
      <nav className="bg-white dark:bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-full flex flex-wrap mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src={logo} className="w-20 mr-2" alt="Flowbite Logo" />
            <span className="self-center text-2xl col-p md:text-3xl font-bold whitespace-nowrap dark:text-[#4f6cc5]">
              My Gold Malls
            </span>
          </a>
          <div className="flex md:order-2 ml-7">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-full justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-[#4f6cc5] dark:focus:ring-gray-100"
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
            className={`w-full h-screen md:h-9 bg-[#e0e8ff] fixed right-0 top-0 transition-transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0 md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 bg-[#e0e8ff] md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("products");
                  setDashboard(true);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Dashboard
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("withdraw");
                  setDashboard(false);
                  setIsWithdraw(true);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 text-black cursor-pointer rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Withdraw Management
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("recharge");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(true);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 text-black cursor-pointer rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Recharge Management
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("recharge");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(true);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 text-black cursor-pointer rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Reward Management
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("users");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(true);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                User Management
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("products");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(true);
                  setIsAgent(false);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Manage Products
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("products");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(false);
                  setIsOrder(true);
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Manage Order
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("products");
                  setDashboard(false);
                  setIsWithdraw(false);
                  setIsRecharge(false);
                  setIsReward(false);
                  setIsUser(false);
                  setIsProduct(false);
                  setIsAgent(true);
                  setIsOrder(false);
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover-bg-transparent dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Manage Administrator
                <ul className="ml-2 mt-2 space-y-2">
                  <li
                    onClick={() => {
                      closeMenu();
                      setDashboard(false);
                      setIsWithdraw(false);
                      setIsRecharge(false);
                      setIsReward(false);
                      setIsUser(false);
                      setIsProduct(false);
                      setIsAgent(true);
                    }}
                    className="cursor-pointer text-sm text-gray-700 hover:text-[#4f6cc5] hover:font-medium"
                  >
                    -Add Agent
                  </li>
                </ul>
              </li>
              <li className="block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-sm hover:text-[#4f6cc5] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#4f6cc5] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out ">
                <button className="bg-blue-900 hover:bg-[#03543F] text-white font-semibold py-2 px-4 rounded-full" onClick={()=>{
                  Cookies.remove("admin_session_id");
                  navigate("/login");
                }}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{ marginTop: "7rem" }}
        id="withdraw"
        className={`container flex flex-col mx-auto justify-center items-center ${
          iswithdraw ? "block" : "hidden"
        }`}
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2 className="mb-2 text-[#34358f] text-2xl font-semibold tracking-tight  dark:text-[#03543F]">
              Withdraw Management
            </h2>
          </div>
        </div>

        <div className="mx-3 my-3 ">
          {/* Status filter dropdown */}
          <label className="text-gray-700 dark:text-gray-300 mx-1 ">
            Filter by Status:
          </label>
          <select
            value={sortByStatus}
            onChange={(e) => setSortByStatus(e.target.value)}
            className="block w-32 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div style={{ width: "80%" }} className="my-4 mx-auto">
          <form>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  setUserViaMobile(e.target.value);
                }}
                value={userViaMobile}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search via mobile"
                required
              />
              
              <button
                onClick={async (e) => {
                  // search numer in fakeUserData
                  e.preventDefault();
                  const user = withdrawRecords.filter(
                    (item) => item.phone_number === userViaMobile
                  );
                  if (user) {
                    // from fake user data remove all users except this user
                    setDataArray(user);
                  } else {
                    alert("User not found");
                  }
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
              
            </div>
            <img width="35" height="35" className="m-1 cursor-pointer" onClick={dataFetch} src="https://img.icons8.com/ios/50/synchronize.png" alt="synchronize"/>
          </form>
        </div>

        <div className="relative overflow-x-auto mx-2">
          <table className="w-full text-sm text-left ml-96 md:ml-0 text-gray-500 dark:text-gray-400">
            <thead className="text-xs dark:text-[#03543F] uppercase bg-gray-50 dark:bg-gray-700 text-[#03543F]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno.
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Account No
                </th>
                <th scope="col" className="px-6 py-3">
                  IFSC code
                </th>
                <th scope="col" className="px-6 py-3">
                  card holder name
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {DataArray.filter((item) =>
                sortByStatus ? item.Status === sortByStatus : true
              ).map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <button
                      onClick={() => {
                        viewuser(item);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {item.user}
                    </button>
                  </td>
                  <td className="px-6 py-4">₹{item.amount}</td>
                  <td
                    className={`px-6 py-4 ${
                      item.status
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } whitespace-nowrap`}
                  >
                    {item.status
                      ? "Approved"
                      : item.is_rejected
                      ? "Rejected"
                      : "Pending"}
                  </td>
                  <td className="px-6 py-4">{item.date}</td>

                  <td className="px-6 py-4">{item.bank_card}</td>
                  <td className="px-6 py-4">{item.ifsc_code}</td>
                  <td className="px-6 py-4">{item.account_holder_name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(item)}
                      className={`text-blue-500 ${
                        item.status
                          ? "pointer-events-none text-gray-400"
                          :
                          
                          (item.is_rejected ? "pointer-events-none text-gray-400" : "hover:text-blue-700")
                      }`}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalIsOpen && (
            <ApprovalModal
              item={selectedItem}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              onApprove={handleApprove}
            />
          )}

          {/* Withdrawal approval modal */}
          {rechargeModalIsOpen && (
            <RechargeModal
              item={selectedItem}
              isOpen={rechargeModalIsOpen}
              onRequestClose={closeRechargeModal}
              onApprove={handelApproveRecharge}
            />
          )}
        </div>
      </div>
      <div
        style={{ marginTop: "8rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isrecharge ? "block" : "hidden"
        }`}
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="recharge"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Recharge Records
            </h2>
          </div>
        </div>

        <div style={{ width: "80%" }} className="mx-auto my-4">
          <form>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  setUserViaMobile(e.target.value);
                }}
                value={userViaMobile}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-900 dark:focus:border-gray-700"
                placeholder="Search by mobile"
                required
              />
              <button
                onClick={async (e) => {
                  // search numer in fakeRechargeRecords
                  e.preventDefault();
                  const user = rechargeRecords.filter(
                    (item) => item.phone_number === userViaMobile
                  );
                  if (user) {
                    // from fake user data remove all users except this user
                    setFakeRechargeRecords(user);
                  } else {
                    alert("User not found");
                  }
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
              <img width="35" height="35" className="mt-1 cursor-pointer" onClick={dataFetch} src="https://img.icons8.com/ios/50/synchronize.png" alt="synchronize"/>
          </form>
        </div>

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm ml-96 md:ml-0 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno.
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeRechargeRecords.map((record, index) => (
                <tr
                  key={index + 1}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <button
                      onClick={() => {
                        viewrecharge(record);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {record.user}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    ₹{record.amount}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      record.status
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } whitespace-nowrap`}
                  >
                    {record.is_rejected
                      ? "Rejected"
                      : record.status
                      ? "Approved"
                      : "Pending"}
                    {/* {record.status ? "Approved" : (record.is_rejected ? "Rejected" : "Pending")} */}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {record.date}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openRechargeModal(record)}
                      className={`text-blue-500 ${
                        record.status
                          ? "pointer-events-none text-gray-400"
                          : 
                          (record.is_rejected ? "pointer-events-none text-gray-400" : "hover:text-blue-700")
                      }`}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="users"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isuser ? "block" : "hidden"
        }`}
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="users"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              User Management
            </h2>
          </div>
        </div>

        <div style={{ width: "80%" }} className="my-4 mx-auto">
          <form>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  setUserViaMobile(e.target.value);
                }}
                value={userViaMobile}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search via mobile"
                required
              />
              <button
                onClick={async (e) => {
                  // search numer in fakeUserData
                  e.preventDefault();
                  const user = userData.find(
                    (user) => user.phone_number === userViaMobile
                  );
                  if (user) {
                    // from fake user data remove all users except this user
                    setFakeUserData([user]);
                  } else {
                    alert("User not found");
                  }
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm ml-[37%] md:ml-0 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Invite Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Recommended By
                </th>
                <th scope="col" className="px-6 py-3">
                  VIP Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Wallet
                </th>
                <th scope="col" className="px-6 py-3">
                  Recharge Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Income
                </th>
                <th scope="col" className="px-6 py-3">
                  Is Admin
                </th>
                <th scope="col" className="px-6 py-3">
                  Is Agent
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeUserData.length > 0 &&
                fakeUserData.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.phone_number}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-green-400">
                      {user.invite_code}
                    </td>
                    <td className="px-6 py-4 text-green-600 whitespace-nowrap dark:text-white">
                      {user.is_verified ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.start_time}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.recommended_by ? user.recommended_by : "None"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.vip_level}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      ₹{user.wallet}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      ₹{user.recharge_amount}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      ₹{user.income}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.is_admin ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {user.is_agent ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="products"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isproduct ? "block" : "hidden"
        }`}
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="users"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Product Details
            </h2>
          </div>
        </div>

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno.
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeProductData.map((product, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    ₹{product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="order"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isorder ? "block" : "hidden"
        }`}
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="users"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Order Details
            </h2>
          </div>
        </div>

        <div style={{ width: "80%" }} className="my-4 mx-auto">
          <form>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  setUserViaMobile(e.target.value);
                }}
                value={userViaMobile}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search via mobile"
                required
              />
              <button
                onClick={async (e) => {
                  // search numer in fakeUserData
                  e.preventDefault();
                  const user = fakeOrders.filter(
                    (user) => user.phone_number === userViaMobile
                  );
                  if (user) {
                    // from fake user data remove all users except this user
                    setFakeOrders(user);
                  } else {
                    alert("User not found");
                  }
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm ml-32 md:ml-0 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno.
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date_of_order
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeOrders.map((orders, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {orders.user}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {orders.product}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    ₹{orders.amount}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {orders.date_purchase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="dashboard"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col p-5 justify-center items-center ${
          isdashboard ? "block" : "hidden"
        }`}
      >
        <div className="mb-5">
          <p className="text-lg font-normal text-gray-900 dark:text-white">
            Admin Wallet Balance: ₹{admin_wallet}
          </p>
        </div>

        <div className="table-container">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Metric
                </th>
                <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  Total Orders
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  {overallData.total_orders}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  Total Users
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  {overallData.total_users}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  Total Products
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  {overallData.total_products}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  Total Recharge Records Today
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  {overallData.total_recharge_records_today}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  Total Withdraw Records Today
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left text-sm font-normal text-gray-900 dark:text-white">
                  {overallData.total_withdraw_records_today}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={handelDistributeIncome}
            className="bg-blue-900 hover:bg-[#03543F] text-white font-semibold py-2 px-4 rounded-full"
          >
            Distribute Income
          </button>
        </div>
      </div>
      <div
        id="agent"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isreward ? "block" :
           "hidden"
        }`}
      >
        <div className="add-agent p-5 m-5 ">
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentNumber"
              >
                User Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentNumber"
                type="number"
                placeholder="8956798125"
                value={reward.phone_number}
                onChange={(event) => {
                  setReward({
                    ...reward,
                    phone_number: event.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentNumber"
              >
                User Wallet Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentNumber"
                type="number"
                placeholder="5000"
                value={reward.wallet}
                onChange={(event) => {
                  setReward({
                    ...reward,
                    wallet: event.target.value,
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleRewardSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        id="agent"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className={`container flex flex-col mx-auto justify-center items-center ${
          isagent ? "block" : "hidden"
        }`}
      >
        <div className="add-agent p-5 m-5 ">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentName"
              >
                Agent Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentName"
                type="text"
                placeholder="Agent Name"
                value={agent.agentName}
                onChange={(event) => {
                  setAgent({
                    ...agent,
                    agentName: event.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentNumber"
              >
                Agent Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentNumber"
                type="number"
                placeholder="8956798125"
                value={agent.agentNumber}
                onChange={(event) => {
                  setAgent({
                    ...agent,
                    agentNumber: event.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentNumber"
              >
                Agent Initial Wallet Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentNumber"
                type="number"
                placeholder="5000"
                value={agent.agentInitialWallet}
                onChange={(event) => {
                  setAgent({
                    ...agent,
                    agentInitialWallet: event.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentNumber"
              >
                Agent Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="agentNumber"
                type="password"
                placeholder="******"
                value={agent.agentPassword}
                onChange={(event) => {
                  setAgent({
                    ...agent,
                    agentPassword: event.target.value,
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleAgentSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
