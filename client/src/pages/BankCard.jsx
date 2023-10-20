import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function BankCard() {
  const [bankCard, setBankCard] = useState([]);

  useEffect(() => {
    const showmybankcard = async () => {
      const token = Cookies.get("session_id");
      const decoded = await jwt_decode(token);
      const response = await axios.post('http://139.59.32.207/accounts/showmybankcard/', {
        phone_number: decoded.phone_number
      }, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.status === "Success") {
        console.log(response.data.data)
        setBankCard(response.data.data)
      }
    }
    showmybankcard()
  } , [])
  return (
    <div style={{ marginTop: "7rem" }} className="container flex flex-col mx-auto justify-center item-center">
            <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                <div className="withdrawals flex flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>Bank Card</h2>
                    { bankCard.length>0 && bankCard.map((bankCard, index) => {
                      return (
<div className="max-w-sm w:full-screen my-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Card Holder Name:</span> {bankCard.card_holder_name} <br />
        <span className="font-bold">Bank Name:</span> {bankCard.bank_name} <br />
        <span className="font-bold">Card Number:</span> {bankCard.card_number} <br />
        <span className="font-bold">IFSC Code:</span> {bankCard.ifsc_code} <br />

    </p>
</div>
                      )})}

                    <Link to="/add-card" className="focus:outline-none my-3 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Add Card</Link>
                    </div>
                    </div>
                    </div>
  )
}
