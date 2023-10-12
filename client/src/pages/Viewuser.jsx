import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ApprovalModal from "../components/general/AdminModal";
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
    
      const handleApprove = (item) => {
        console.log("approve" + item.User);
        //approval logic
        closeModal();
      };
      const DataArray = [
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
      ];
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
              bank card
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
                {item.Sno}
              </th>
              <td className="px-6 py-4">{item.Amount}</td>
              <td className="px-6 py-4">{item.Status}</td>
              <td className="px-6 py-4">{item.Date}</td>
              <td className="px-6 py-4">{item.Card}</td>
              <td className="px-6 py-4">{item.Accountno}</td>
              <td className="px-6 py-4">{item.ifsc}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => openModal(item)}
                  className={`text-blue-500 ${
                    item.Status === "Paid"
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
