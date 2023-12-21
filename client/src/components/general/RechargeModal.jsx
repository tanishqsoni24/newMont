import React from "react";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// Create a Modal component
const RechargeModal = ({ item, isOpen, onRequestClose, onApprove }) => {
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

  const approveWithdrawal = async (item) => {
    const response = await axios.post(
      "http://localhost:8000/administ/approve_recharge/",
      {
        recharge_id : item.id,
        is_rejected: false,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    window.location.reload();

  }

  const rejectWithdrawal = async (item) => {
    const response = await axios.post(
      "http://localhost:8000/administ/approve_recharge/",
      {
        recharge_id : item.id,
        is_rejected: true,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    window.location.reload();
    console.log(response);
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


export default RechargeModal;
