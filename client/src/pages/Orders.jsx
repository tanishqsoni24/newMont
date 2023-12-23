import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function Orders() {
    useEffect(() => {
        // Set the background color for the body element
        document.body.classList.add('body-bg-color');
      
        // Clean up by removing the class when the component unmounts
        return () => {
          document.body.classList.remove('body-bg-color');
        };
      }, []);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const requestorders = async () => {
            const token = Cookies.get("session_id");
            const decoded = await jwt_decode(token);
            const response = await axios.post('http://192.168.7.112:8000/accounts/myorders/',{
                phone_number : decoded.phone_number
            } ,{ headers: { 'Content-Type': 'application/json' } });
            setOrders(response.data.data)
        }
        requestorders()
      }
        , [])
    return (

        <div style={{ marginTop: "7rem" }} className="container flex flex-col mx-auto justify-center item-center">
            <div className="dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                <div className="withdrawals flex flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>My Orders</h2>
                    </div>
                    </div>
    
<div class="relative overflow-x-auto mx-2 my-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            { orders.length>0 && orders.map((order, index) => {
                return (
             <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.product_name}
                </th>
                <td class="px-6 py-4">
                    {order.date_purchase}
                </td>
                <td class="px-6 py-4">
                ₹{order.product_price}
                </td>
            </tr>
           )})}
        </tbody>
    </table>
    <div className='flex justify-center'>
        {orders.length === 0 && <p className='text-2xl text-gray-500'>No orders yet</p>}
        </div>
</div>
</div>
    )
}
