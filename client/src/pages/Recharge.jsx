import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import ApprovalModal from "../components/general/AdminModal";
import RechargeModal from "../components/general/RechargeModal";
export default function Viewuser() {
  const { userId} = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const openRechargeModal = (item) => {
    setSelectedItem(item);
    setrechargeModalIsOpen(true);
  };
  const handelApproveRecharge =  (item) => {
    console.log("approve" + item.user);
    //approval logic
    closeRechargeModal();
  };

  const [rechargeModalIsOpen, setrechargeModalIsOpen] = useState(false);

  const closeRechargeModal = () => {
    setSelectedItem(null);
    setrechargeModalIsOpen(false);
  };
      const [fakeRechargeRecords, setFakeRechargeRecords] =useState([]);
      useEffect(() => {
        const rechargeDetail = async () => {
        const response = await axios.post('http://139.59.32.207/administ/recharge_detail/',{phone_number : userId.split("-")[1]} ,{"content": "application/json"});
        console.log(response.data.data)
        setFakeRechargeRecords(response.data.data)
        }
        rechargeDetail()
    }
        , [])

  return (
    <div
        style={{ marginTop: "3rem" }}
        className="container flex flex-col mx-auto justify-center item-center"
      >
        <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">
          <div className="withdrawals flex flex-col item-center justify-center">
            <h2
              id="recharge"
              className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Recharge Records of {userId}
            </h2>
          </div>
        </div>
        {rechargeModalIsOpen && (
            <RechargeModal
              item={selectedItem}
              isOpen={rechargeModalIsOpen}
              onRequestClose={closeRechargeModal}
              onApprove={handelApproveRecharge}
            />)}
        <div className="relative overflow-x-auto mx-2 my-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
  )
}
