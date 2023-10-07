import React from 'react'
import { Link } from 'react-router-dom'

export default function BankCard() {
  return (
    <div style={{ marginTop: "7rem" }} className="container flex flex-col mx-auto justify-center item-center">
            <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                <div className="withdrawals flex flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>Bank Card</h2>
                    <Link to="/add-card" className="focus:outline-none my-3 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Add Card</Link>
                    </div>
                    </div>
                    </div>
  )
}
