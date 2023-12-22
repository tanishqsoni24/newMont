import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// Create a Modal component
const ApprovalModal = ({ item, isOpen, onRequestClose, onApprove }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "20px",
      width: "300px", // Adjust the width as needed
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
  };

  const generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 10000000000000000);
    return randomNumber;
  }

  const [transaction_id, setTransactionId] = useState("aux"+generateRandomNumber());
  const [doneTransactionId, setDoneTransactionId] = useState("");
  
  const approveWithdrawal = async (item) => {
    const token = Cookies.get("admin_session_id");
    const decoded = jwt_decode(token);

    const getWithdrawalDetails = await axios.post("http://192.168.13.112:8000/administ/get_withdrawl_data/", 
            {
              withdrawal_id: item.id
            }, 
            { 
              headers: {
                "Content-Type": "application/json" 
              } 
            });

    const withdrawalDetails = await getWithdrawalDetails.data;
    console.log(withdrawalDetails)
    // console.log(withdrawalDetails.data)
    if(withdrawalDetails.status==="Success") {
      const getWithdraw = await axios.post("http://192.168.13.112:3001/withdraw", 
      {
        transaction_id: transaction_id,
        account_holder_name: withdrawalDetails.data.account_holder_name,
        bank_name: withdrawalDetails.data.bank_name,
        account_number: withdrawalDetails.data.account_number,
        ifsc_code: withdrawalDetails.data.ifsc_code,
        mobile_number: withdrawalDetails.data.mobile_number,
        email: withdrawalDetails.data.email,
        amount: withdrawalDetails.data.amount
      },
      { 
        headers: { 
          "Content-Type": "application/json" 
        } 
      });
      console.log(getWithdraw.data)
      if(getWithdraw.data.status_code === 1){

        const response = await axios.post(
          "http://192.168.13.112:8000/administ/approve_withdraw/",
          {
            withdrawal_id: item.id,
            is_rejected: false,
            transaction_id: transaction_id,
            utr : getWithdraw.data.utr,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
      }
      setTransactionId("aux"+generateRandomNumber());
      window.location.reload();
    }
  }

  const rejectWithdrawal = async (item) => {
    const token = Cookies.get("admin_session_id");
    const decoded = jwt_decode(token);
    const response = await axios.post(
      "http://192.168.13.112:8000/administ/approve_withdraw/",
      {
        withdrawal_id: item.id,
        is_rejected: true,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    window.location.reload();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Approval Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="text-center">
        <h2 className="text-emerald-500 font-bold text-center text-2xl mb-4">Approval Confirmation</h2>
        <p>User: {item.user}</p>
        <p>Amount: {item.amount}</p>
        <p>Status: {item.status?"Approved": "Pending"}</p>
        <p>Date: {item.date}</p>
        <p>Account No: {item.bank_card}</p>
        <p>IFSC Code: {item.ifsc_code}</p>
        <p>Card Holder Name: {item.account_holder_name}</p>

        <button
          onClick={() => {
            onApprove(item)
            approveWithdrawal(item)}}
          className="bg-emerald-500 text-white py-2 px-4 mt-4 rounded hover:bg-emerald-600"
        >
          Confirm Approve
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-200 mx-3 text-gray-700 py-2 px-4 mt-2 rounded hover:bg-gray-300"
        >
          Close
        </button>
        <button
        onClick={() => {
          rejectWithdrawal(item)
        }}
        className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
      >
        Reject
      </button>
      </div>
    </Modal>
  );
};

export default ApprovalModal;
