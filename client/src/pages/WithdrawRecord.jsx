import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'


export default function WithdrawRecord() {
    const [withdrawRecord, setWithdrawRecord] = useState([])
    useEffect(() => {
        const withdrawRecord = async () => {
            const token = Cookies.get("session_id");
            const decoded = await jwt_decode(token);
            const response = await axios.post('http://localhost:8000/accounts/mywithdrawrecord/', {
                phone_number: decoded.phone_number
            }, { headers: { 'Content-Type': 'application/json' } });
            if (response.data.status === "Success") {
                setWithdrawRecord(response.data.data)
            }
            console.log(response.data.data)
        }
        withdrawRecord()
    }, [])
    return (

        <div style={{ marginTop: "7rem" }} className="container flex flex-col mx-auto justify-center item-center">
            <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                <div className="withdrawals flex flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>Withdraw Records</h2>
                    </div>
                    </div>
    
<div class="relative overflow-x-auto mx-2 my-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Withdraw Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
        { withdrawRecord.length>0 && withdrawRecord.map((withdraw, index) => {
                return (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {withdraw.date}
                </th>
                <td class="px-6 py-4">
                    ₹{withdraw.amount}
                </td>
                <td class="px-6 py-4">
                    {withdraw.status? 
                    (<p className='text-green-500'>Success</p>) : 
                    (<p className='text-red-500'>Pending</p>)
                    }
                </td>
            </tr>
            )})}
            
        </tbody>
    </table>
    <div className="noice flex justify-center my-5">
        <p className='text-red-500'>*Note: Withdrawal will be processed within 24 hours</p>
    </div>
</div>
</div>
    )
}
