import React from 'react'
import { useParams } from 'react-router-dom';
export default function Viewuser() {
  const { userId} = useParams();
      const fakeRechargeRecords = [
        {
          Sno: 1,
          User: "User 1",
          Amount: "$100.00",
          Status: "Paid",
          Date: "2023-10-09",
          RemainingBalance: "$2510",
        },
        {
          Sno: 2,
          User: "User 2",
          Amount: "$50.00",
          Status: "Unpaid",
          Date: "2023-10-10",
          RemainingBalance: "$8740",
        },
        {
          Sno: 3,
          User: "User 3",
          Amount: "$75.00",
          Status: "Paid",
          Date: "2023-10-11",
          RemainingBalance: "$1000",
        },
      ];
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
                  Remaining Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeRechargeRecords.map((record) => (
                <tr
                  key={record.Sno}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {record.Sno}
                  </th>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      {record.User}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {record.Amount}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      record.Status === "Paid"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } whitespace-nowrap`}
                  >
                    {record.Status}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {record.Date}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {record.RemainingBalance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}
