import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ApprovalModal from "../components/general/AdminModal";
import axios from 'axios'
export default function Viewuser() {
  const { userId} = useParams();
    const [sortByStatus, setSortByStatus] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const openModal = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setSelectedItem(null);
        setModalIsOpen(false);
      };
      useEffect(() => {
        const withdrawDetail = async () => {
        const response = await axios.post('http://143.110.179.22:8000/administ/withdrawal_detail/',{phone_number : userId.split("-")[1]} ,{"content": "application/json"});
        //(response.data.data)
        
        setDataArray(response.data.data)
        }
        withdrawDetail()
    }, [])
    
      const handleApprove = (item) => {
        //("approve" + item.User);
        //approval logic
        closeModal();
      };
      const [DataArray, setDataArray] = useState([
        {
          Sno: 1,
          Amount: "₹500",
          Status: "Paid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        {
          Sno: 2,
          Amount: "₹300",
          Status: "Unpaid",
          Date: "2023-10-08",
          Card: "**** **** **** 5678",
          Accountno: "9876543210",
          ifsc: "EFGH9876543",
          name: "Jane Smith",
        },
        {
          Sno: 3,
          Amount: "₹700",
          Status: "Paid",
          Date: "2023-10-07",
          Card: "**** **** **** 4321",
          Accountno: "4567890123",
          ifsc: "IJKL4567890",
          name: "Bob Johnson",
        },
        {
          Sno: 4,
          Amount: "₹500",
          Status: "Unpaid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        {
          Sno: 5,
          Amount: "₹500",
          Status: "Paid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        {
          Sno: 6,
          Amount: "₹500",
          Status: "Paid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        {
          Sno: 7,
          Amount: "₹500",
          Status: "Unpaid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        {
          Sno: 8,
          Amount: "₹500",
          Status: "Unpaid",
          Date: "2023-10-09",
          Card: "**** **** **** 1234",
          Accountno: "1234567890",
          ifsc: "ABCD1234567",
          name: "John Doe",
        },
        // Add more fake data here as needed
      ]);
  return (
    <div
    style={{ marginTop: "1rem" }}
    id="withdraw"
    className="container flex flex-col mx-auto justify-center item-center"
  >
    <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
      <div className="withdrawals flex flex-col item-center justify-center">
        <h2 className="mb-2 text-[#014737] text-4xl font-semibold tracking-tight  dark:text-[#03543F]">
          Withdraw Records of {userId}
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
              <td className="px-6 py-4">₹{item.amount}</td>
              <td className="px-6 py-4">{item.status? 
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Approved
            </span> :
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Pending
            </span>  
            }</td>
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{item.account_number}</td>
              <td className="px-6 py-4">{item.ifsc_code}</td>
              <td className="px-6 py-4">{item.card_holder_name}</td>
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
    </div>
  </div>
  )
}
