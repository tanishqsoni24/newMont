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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const handelDistributeIncome = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/administ/distribute_income/",
      {},
      { headers: { "Content-Type": "application/json" } }

    );
    alert(response.data.message);
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

  const handelApproveRecharge =  (item) => {
    console.log("approve" + item.user);
    //approval logic
    closeRechargeModal();
  };
  const handleApprove = (item) => {
    console.log("approve" + item.user);
    //approval logic
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

  useEffect(() => {
    
    const dataFetch = async (e) => {
      console.log("hello")
      const token = Cookies.get("admin_session_id");
      const decoded = await jwt_decode(token);
      const response = await axios.post("http://localhost:8000/administ/"
      ,{phone_number : decoded.phone_number} , {"content": "application/json"});


       

      setDataArray(response.data.withdraw_records_details);
      setFakeRechargeRecords(response.data.recharge_records);
      setFakeUserData(response.data.users_details);
      setFakeProductData(response.data.products_details);
      setFakeOrders(response.data.order_details);
      setAdmin_wallet(response.data.admin_wallet);
      console.log(response.data.orders_details);
      console.log(response.data);
    };
    dataFetch();
  }, []);

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
    }
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
    }
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
  ])
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
        <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-20 mr-2" alt="Flowbite Logo" />
            <span className="self-center text-2xl col-p md:text-3xl font-bold whitespace-nowrap dark:text-[#0E9F6E]">
              New Mont
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
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("withdraw");
                }}
                className={`block py-2 pl-3 pr-4 text-black cursor-pointer rounded col-p text-lg hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Withdraw Records
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("recharge");
                }}
                className={`block  py-2 pl-3 pr-4 text-black cursor-pointer rounded col-p text-lg hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Recharge Records
              </li>

              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("users");
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Users
              </li>
              <li
                onClick={() => {
                  closeMenu();
                  scrollToSection("products");
                }}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-black rounded col-p text-lg hover:text-[#0E9F6E] hover:bg-transparent md:hover:bg-transparent md:p-0 md:dark:hover:text-[#0E9F6E] dark:text-black dark:hover:bg-transparent dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200 ease-in-out `}
              >
                Products
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{ marginTop: "7rem" }}
        id="withdraw"
        className="container flex flex-col mx-auto justify-center item-center"
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2 className="mb-2 text-[#014737] text-4xl font-semibold tracking-tight  dark:text-[#03543F]">
              Withdraw Records
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
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div className="relative overflow-x-auto mx-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  <td className={`px-6 py-4 ${
                      item.status
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } whitespace-nowrap`}>{item.status? "Approved" :"Pending"}</td>
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
                          : "hover:text-blue-700"
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
        className="container flex flex-col mx-auto justify-center item-center"
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

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  key={index+1}
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
                    {record.status? "Approved" :"Pending"} 
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
                          : "hover:text-blue-700"
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
        className="container flex flex-col mx-auto justify-center item-center"
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="users"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              User Details
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
              </tr>
            </thead>
            <tbody>
              {fakeUserData.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index+1}
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
                    {user.is_verified? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {user.start_time}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {user.recommended_by? user.recommended_by : "None"}
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
                    {user.is_admin? "Yes" : "No"}
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
        className="container flex flex-col mx-auto justify-center item-center"
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
                  {index+1}
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

        <div
        id="products"
        style={{ marginTop: "8rem", marginBottom: "7rem" }}
        className="container flex flex-col mx-auto justify-center item-center"
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

        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              {fakeOrders.map((orders, index) =>  (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index+1}
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
      <div className="flex mb-5 justify-center">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          Admin Wallet Balance : ₹{admin_wallet}
        </p>
      </div>
        <div className="flex justify-center">
          <button onClick={handelDistributeIncome} className="bg-[#0E9F6E] hover:bg-[#03543F] text-white font-semibold py-2 px-4 rounded-full">
            Distribute Income
          </button>
          </div>
      </div>
    </>
  );
}
