import React from 'react'

export default function Orders() {
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
                    Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Iron ore
                </th>
                <td class="px-6 py-4">
                    2021-08-01
                </td>
                <td class="px-6 py-4">
                    1
                </td>
                <td class="px-6 py-4">
                ₹2585
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Iron ore
                </th>
                <td class="px-6 py-4">
                    2021-08-01
                </td>
                <td class="px-6 py-4">
                    1
                </td>
                <td class="px-6 py-4">
                ₹2585
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Iron ore
                </th>
                <td class="px-6 py-4">
                    2021-08-01
                </td>
                <td class="px-6 py-4">
                    1
                </td>
                <td class="px-6 py-4">
                ₹2585
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>
    )
}
