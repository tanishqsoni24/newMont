import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import "../App.css";
import sign from "jwt-encode";
import RBPEncryption from "../helpers/encryptData";

export default function Profile() {
  const [withdraw, setWithdraw] = useState(0);
  const [withdrawwarning, setWithdrawwarning] = useState("");
  const [rechargewarning, setRechargewarning] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    phone_number: "",
    name: "",
    wallet: "",
    recharge_amount: "",
    income: "",
    invite_code: "",
  });
  const [isRechargePopupOpen, setIsRechargePopupOpen] = useState(false);
  const openPopup = () => {
    setIsRechargePopupOpen(true);
  };
  const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);
  const openWithdrawPopup = () => {
    setWithdrawwarning("");
    setIsWithdrawPopupOpen(true);
  };
  const closeWithdrawPopup = () => {
    setIsWithdrawPopupOpen(false);
  };

  const closePopup = () => {
    setRechargewarning("");
    setIsRechargePopupOpen(false);
  };
  const [bankCardPopup, setBankCardPopup] = useState(false);

  const closeBankCardPopup = () => {
    setBankCardPopup(false);
  };
  const handelWithdraw = (e) => {
    e.preventDefault();
    if (withdraw === 0 || withdraw === "") {
      setWithdrawwarning("Withdraw amount is required.");
      return;
    }

    if (withdraw <= 100) {
      setWithdrawwarning("Withdraw amount should be greater than 100");
      return;
    }

    try {
      // popup close
      closeWithdrawPopup();
      // popup for select bank card
      setBankCardPopup(true);
    } catch (err) {
      //(err);
    }
  };
  const userDeatil = async () => {
    const token = Cookies.get("session_id");
    const decoded = await jwt_decode(token);
    //(decoded);
    const response = await axios.post(
      "https://mygoldmalls.com/api/accounts/userDetail/",
      { phone_number: decoded.phone_number },
      { headers: { "Content-Type": "application/json" } }
    );
    setUser({
      phone_number: decoded.phone_number,
      name: decoded.first_name + " " + decoded.last_name,
      invite_code: decoded.invite_code,
      wallet: response.data.data.wallet,
      recharge_amount: response.data.data.recharge_amount,
      income: response.data.data.income,
    });
  };
  const [bankCard, setBankCard] = useState([]);
  useEffect(() => {
    const bankCard = async () => {
      const response = await axios.post(
        "https://mygoldmalls.com/api/accounts/showmybankcard/",
        { phone_number: user.phone_number },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.status === "Success") {
        //(response.data.data);
        setBankCard(response.data.data);
      }
    };
    bankCard();
  }, [bankCardPopup]);

  const [isAlert, setIsAlert] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isAlert]);

  useEffect(() => {
    userDeatil();
  }, []);
  const [recharge, setRecharge] = useState(0);

  const [selectBankCard, setSelectBankCard] = useState({
    card_holder_name: "",
    bank_name: "",
    card_number: "",
    ifsc_code: "",
  });

  const handelWithdrawRequest = async (e) => {
    e.preventDefault();

    const token = Cookies.get("session_id");
    const decoded = jwt_decode(token);

    if (selectBankCard.card_holder_name == "") {
      setError("Please Select Bank Card");
      return;
    }
    const response = await axios.post(
      "https://mygoldmalls.com/api/accounts/withdraw/",
      {
        phone_number: decoded.phone_number,
        amount: withdraw,
        bank_card_number: selectBankCard.card_number,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.status === "Success") {
      //(response.data);
      closeBankCardPopup();
      setIsAlert(
        "Withdraw Request Sent Successfully of amount ₹" + withdraw + ".00 "
      );
    } else {
      closeBankCardPopup();
      setIsAlert(response.data.message);
    }
  };

  // generate random number of 16 digits

  const generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 10000000000000000);
    return randomNumber;
  };

  const [qrCode, setQrCode] = useState("#");
  const [transaction_id, setTransaction_id] = useState(
    "aux" + generateRandomNumber()
  );
  const [doneTransactionId, setDoneTransactionId] = useState("");
  const [paymentSuccessResponse, setPaymentSuccessResponse] = useState({
    status_code: undefined,
    txn_status: "",
    status_msg: "",
    transaction_id: "",
    amount: undefined,
    utr: "",
    phone_number: "",
  });

  const handelRecharge = async (e) => {
    e.preventDefault();
    if (recharge === 0 || recharge === "") {
      setRechargewarning("Recharge amount is required.");
      return;
    }

    if (recharge > 5000) {
      setRechargewarning("Recharge amount should be less than 5000");
      return;
    }

    try {
      const token = Cookies.get("session_id");
      const decoded = jwt_decode(token);
      const response = await axios.post(
        "https://mygoldmalls.com/payment/recieve",
        {
          transaction_id: transaction_id,
          name: user.name,
          email: "abcsample@mail.com",
          mobile: user.phone_number,
          amount: recharge,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.status_code === 1) {
        // addqrcode state
        setQrCode(response.data.qr_string);
        setfireUPI(true);
        setDoneTransactionId(transaction_id);
        setTransaction_id("aux" + generateRandomNumber());
      }
    } catch (err) {
      alert("something went wrong");
    }
  };
  const [fireUPI, setfireUPI] = useState(false);
  const [loadrecharge, setloadrecharge] = useState(false); // [loadrecharge, setloadrecharge]
  const [isConfirmRecharge, setIsConfirmRecharge] = useState(false);
  useEffect(() => {
    if (fireUPI) {
      document.getElementById("fireUPI").click();
      // construct a model for payment reject or confirm
      // close recharge popup
      setIsRechargePopupOpen(false);
      // open confirm recharge popup
      setIsConfirmRecharge(true);

      setfireUPI(false);
    }
  }, [fireUPI]);
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color2");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color2");
    };
  }, []);

  const getPaymentAck = async () => {
    try {
      setloadrecharge(true);
      const token = Cookies.get("session_id");
      const decoded = jwt_decode(token);
      const response = await axios.post(
        "https://mygoldmalls.com/payment/paymentAck",
        {
          transaction_id: doneTransactionId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setloadrecharge(false);
      if (response.data.status_code === 1 && utr!=null) {
        setPaymentSuccessResponse({
          status_code: response.data.status_code,
          txn_status: response.data.txn_status,
          status_msg: response.data.status_msg,
          transaction_id: response.data.transaction_id,
          amount: response.data.amount,
          utr: response.data.utr,
          phone_number: user.phone_number,
        });
        alert(
          "Recharge Successful, Your Payment will be approved shortly, view your recharge status inside 'Recharge Record'"
        );
        setIsConfirmRecharge(false);
      } else {
        alert("Something went wrong");
        window.location.href = "/profile";
      }
    } catch (err) {
      alert("Something went wrong");
      window.location.href = "/profile";
    }
  };

  useEffect(() => {
    const handelPaymentSuccess = async () => {
      const backendResponse = await axios.post(
        "https://mygoldmalls.com/api/accounts/recharge/",
        paymentSuccessResponse,
        { headers: { "Content-Type": "application/json" } }
      );

      if (backendResponse.data.status === "Success") {
        //(response.data);

        // decode the token

        userDeatil();
        setIsAlert(
          "Recharge Request Sent Successfully of amount ₹" + recharge + ".00 "
        );
      }
      // else {
      //   // setIsAlert(backendResponse.data.message);
      // }
    };

    handelPaymentSuccess();
  }, [paymentSuccessResponse, user]);

  const [deletePopUp, setDeletePopUp] = useState(false);
  const handleDeletePopup = () => {
    setDeletePopUp(true);
  };

  const closeDeleteAccountPopup = () => {
    setDeletePopUp(false);
  };

  const [deletePassword, setDeletePassword] = useState({
    password: "",
  });

  const handelDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("session_id");
      const decoded = await jwt_decode(token);
      const response = await axios.post(
        "https://mygoldmalls.com/api/accounts/deleteMyAccount/",
        {
          phone_number: decoded.phone_number,
          password: deletePassword.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      //(response.data);
      if (response.data.status === "Success") {
        Cookies.remove("session_id");
        window.location.href = "/login";
      } else {
        setIsAlert(response.data.message);
      }
    } catch (err) {
      //(err);
    }
  };

  return (
    <React.Fragment>
      <div className="md:w-5/6 w-full mx-auto">
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
        <h2 className="font-bold text-white mx-3 my-3 text-2xl">Account</h2>
        <div className="profile bg-[#073692] flex mb-5 flex-col items-center justify-center">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/ffffff/gender-neutral-user--v1.png"
            alt="gender-neutral-user--v1"
          />
          <h2 className="mb-2 text-lg font-semibold tracking-tight text-white dark:text-white">
            {user.name}
          </h2>
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-white my-1 dark:text-white">
            +91 {user.phone_number}
          </h2>
        </div>
        <div className="border mx-3 py-4 bg-white border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between">
          <div className="mx-4 flex flex-col item-center justify-center">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-white">
              ₹{user.wallet}.00
            </h2>
            <p>Cash</p>
          </div>
          <div className="teamSize flex mx-4 flex-col item-center justify-center">
            <button
              type="button"
              className="text-white bg-[#00032c] hover:bg-[#363c7b] focus:outline-none focus:ring-4 focus:ring-[#d4d7fb] font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-[#00032c] dark:hover:bg-[#d4d7fb] "
              onClick={openPopup}
            >
              Recharge
            </button>
            <br />

            {/* =================================CHANGE======================================== */}

            <a href={qrCode} id="fireUPI" style={{ display: "none" }}></a>

            {/* ==================================/change/====================================== */}
            <button
              type="button"
              class="text-[#00032c] bg-white border border-[#00032c] focus:outline-none hover:bg-[#d4d7fb] focus:ring-4 focus:ring-[#d4d7fb] font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white"
              onClick={openWithdrawPopup}
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="bg-[#e0e8ff] mt-5 rounded-t-3xl ">
          <div className="mx-3 py-4 rounded-lg grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-around">
            <div className="income-details my-3 mx-auto bg-white p-7 rounded-2xl ">
              <Link to="/income">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/expensive-2--v1.png"
                  alt="expensive-2--v1"
                />
                <p className="mx-auto font-semibold text-center">
                  Income Details
                </p>
              </Link>
            </div>
            <div className="order my-3 mx-auto bg-white p-7 px-14 rounded-2xl">
              <Link to="/orders">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/add-shopping-cart--v1.png"
                  alt="add-shopping-cart--v1"
                />
                <p className="mx-auto font-semibold text-center">Order</p>
              </Link>
            </div>
            <div className="bank-card mx-auto my-3 bg-white py-7 px-11  rounded-2xl">
              <Link to="/bank-card">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/card-verification-value.png"
                  alt="card-verification-value"
                />
                <p className="mx-auto font-semibold text-center">Bank Card</p>
              </Link>
            </div>
            <div className="forgot-password mx-auto my-3 bg-white py-7 px-5 rounded-2xl">
              <Link to="/change-password">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/lock--v1.png"
                  alt="lock--v1"
                />
                <p className="mx-auto font-semibold text-center">
                  Change Password
                </p>
              </Link>
            </div>
            <div
              onClick={handleDeletePopup}
              className="delete-account mx-auto my-3 bg-white p-7 rounded-2xl"
            >
              <img
                width="32"
                height="32"
                className="mx-auto"
                src="https://img.icons8.com/ios/50/00032c/trash--v1.png"
                alt="trash--v1"
              />
              <p className="mx-auto font-semibold text-center">
                Delete Account
              </p>
            </div>
            <div className="download mx-auto my-3 bg-white py-7 px-11 rounded-2xl">
              <img
                width="32"
                height="32"
                className="mx-auto"
                src="https://img.icons8.com/ios/50/00032c/downloads-folder--v1.png"
                alt="downloads-folder--v1"
              />
              <p className="mx-auto font-semibold text-center">Download</p>
            </div>
            <div className="recharge-record mx-auto my-3 bg-white p-6 rounded-2xl">
              <Link to="/recharge-record">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/money-bag.png"
                  alt="money-bag"
                />
                <p className="mx-auto font-semibold text-center">
                  Recharge Record
                </p>
              </Link>
            </div>
            <div className="withdraw-record mx-auto my-3 bg-white p-6 rounded-2xl">
              <Link to="/withdraw-record">
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/ios/50/00032c/banknotes.png"
                  alt="banknotes"
                />
                <p className="mx-auto font-semibold text-center">
                  Withdraw Record
                </p>
              </Link>
            </div>
            <div className="logout mx-auto my-3 bg-white py-7 px-36 rounded-2xl">
              <button
                onClick={() => {
                  Cookies.remove("session_id");
                  window.location.href = "/";
                }}
              >
                <img
                  width="32"
                  height="32"
                  className="mx-auto"
                  src="https://img.icons8.com/windows/32/00032c/exit.png"
                  alt="exit"
                />
                <p className="mx-auto font-semibold text-center">logout</p>
              </button>
            </div>
          </div>
        </div>
        {isConfirmRecharge && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem" }}
              className="flex flex-col justify-center overflow-y-auto items-center md:w-96 md:mx-auto"
            >
              <img
                onClick={() => {
                  setIsConfirmRecharge(false);
                }}
                width="20"
                height="20"
                className="mb-1 ml-[288px] cursor-pointer "
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="delete-sign"
              />
              <div className="w-full bg-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="1st div p-3 ">
                  <p className="text-center text-md text-gray-500 mt-4">
                    Please go on the UPI app and do the payment of ₹{recharge}
                    .00 then click on the confirm recharge button.
                  </p>
                </div>
                <div className="2nd div p-6">
                  <button
                  onClick={getPaymentAck}
                    className="w-full mt-2 text-white bg-[#26439b] hover:bg-[#2d4286] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                      {loadrecharge ? "Processing Recharge..." : "Confirm Recharge"}
                  </button>
                  <button
                    onClick={() => {
                      const response = window.confirm(
                        "Are you sure you want to cancel the recharge?"
                      );
                      if (response) {
                        setIsConfirmRecharge(false);
                      }
                    }}
                    className="w-full mt-2 text-white bg-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel Recharge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isRechargePopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem" }}
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
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
                    Recharge Amount
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        onChange={(e) => setRecharge(e.target.value)}
                        value={recharge == 0 ? "" : recharge}
                        name="recharge"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="750"
                        required=""
                      />
                    </div>
                    <p className="text-sm text-red-700">{rechargewarning}</p>
                    <button
                      type="submit"
                      onClick={handelRecharge}
                      className="w-full text-white bg-[#26439b] hover:bg-[#2d4286] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Process
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {isWithdrawPopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem" }}
              className="flex flex-col justify-center items-end"
            >
              <img
                onClick={closeWithdrawPopup}
                width="20"
                height="20"
                className="mb-1 cursor-pointer "
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="delete-sign"
              />
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
                    Withdraw Request
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Withdraw Amount
                      </label>
                      <input
                        type="number"
                        onChange={(e) => setWithdraw(e.target.value)}
                        value={withdraw == 0 ? "" : withdraw}
                        name="recharge"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="750"
                        required=""
                      />
                    </div>
                    <p className="text-sm text-red-700">{withdrawwarning}</p>
                    <button
                      type="submit"
                      onClick={handelWithdraw}
                      className="w-full text-white bg-[#26439b] hover:bg-[#2d4286] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center0"
                    >
                      Process
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {bankCardPopup && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-96 mt-40 md:mt-0 md:h-full flex flex-col justify-center items-center bg-transparent z-20"
            // Change "bg-gray-900 bg-opacity-50" to "bg-transparent" here
          >
            <div
              style={{ width: "40rem" }}
              className="flex flex-col justify-center overflow-y-auto items-center md:w-96 md:mx-auto"
            >
              <img
                onClick={closeBankCardPopup}
                width="20"
                height="20"
                className="mb-1 "
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="delete-sign"
              />
              <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div
                  className={`${
                    bankCard.length === 0 ? "mt-0" : "mt-80"
                  } p-6 space-y-4 md:space-y-6 sm:p-8 ml-32 md:ml-9 md:mt-0`}
                >
                  <h1
                    className={`text-xl m-4 ${
                      bankCard.length === 0 ? "mt-0 ml-20" : "mt-9"
                    } font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white`}
                  >
                    Select Bank Card
                  </h1>

                  {bankCard.length > 0 &&
                    bankCard.map((card, index) => {
                      return (
                        <button
                          onClick={() => setSelectBankCard(card)}
                          className={
                            selectBankCard.card_number === card.card_number
                              ? "block max-w-sm p-6 bg-blue-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                              : "block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover-bg-gray-700"
                          }
                        >
                          <p className="font-normal text-gray-700 dark:text-gray-400">
                            Bank Name: {card.bank_name} <br />
                            Account Number: {card.card_number} <br />
                            IFSC Code: {card.ifsc_code} <br />
                            Account Holder Name: {card.account_holder_name}{" "}
                            <br />
                          </p>
                        </button>
                      );
                    })}
                  <div>
                    <button
                      type="submit"
                      onClick={handelWithdrawRequest}
                      disabled={bankCard.length === 0}
                      className={`w-32 text-white  ${
                        bankCard.length === 0 ? "ml-24" : ""
                      } bg-blue-600 hover-bg-blue-700 focus:ring-4 focus:outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        bankCard.length === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800"
                      }`}
                    >
                      Process
                    </button>
                    {bankCard.length === 0 && (
                      <p className="text-red-500 text-sm ml-20 md:-ml-7 md:text-center">
                        Please add a bank card.
                      </p>
                    )}
                    <p className="text-red-500 mt-2 text-sm ml-20 md:-ml-7 md:text-center">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {deletePopUp && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem", cursor: "pointer" }}
              className="flex flex-col justify-center items-end"
            >
              <img
                onClick={closeDeleteAccountPopup}
                width="20"
                height="20"
                className="mb-1"
                src="https://img.icons8.com/ios-glyphs/30/014737/delete-sign.png"
                alt="delete-sign"
              />
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
                    Verify Account Details
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Password Here
                      </label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setDeletePassword({
                            password: e.target.value,
                          })
                        }
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password"
                        required=""
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={handelDeleteAccount}
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Process
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
