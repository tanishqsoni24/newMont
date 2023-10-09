import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


export default function Team() {
    const [user, setUser] = useState({
        invite_code: '',
    })

    useEffect(() => {
        const userDeatil = async () => {
        const token = Cookies.get("session_id");
        const decoded = await jwt_decode(token);
        console.log(decoded)

        setUser({
            invite_code: decoded.invite_code,
        })
        }
        userDeatil()

    }, [])
  return (
    <React.Fragment>
        <div style={{marginTop:"7rem"}} className="md:w-5/6 w-full mx-auto">
            <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-around">

            
            <div className="withdrawals flex flex-col item-center justify-center">
                <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹27000.00</h2>
                <p>Withdrawls</p>
            </div>
            <div className="teamRecharge flex flex-col item-center justify-center">
            <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹56700.00</h2>
                <p>Team Recharge</p>
            </div>
            <div className="teamSize flex flex-col item-center justify-center">
            <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>14</h2>
                <p>Team Size</p>
            </div>
        </div>
        <h2 className='mb-2 mx-1 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white'>Invitation Code</h2>
        <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6 mx-3">
  <label for="success" className="block mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-500">Invite now</label>
  <input type="text" disabled id="success" className="bg-emerald-50 border border-emerald-500 text-emerald-900 dark:text-emerald-400 placeholder-emerald-700 dark:placeholder-emerald-500 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-emerald-500" placeholder={user.invite_code} />
  </div>
  <button type="button" className="focus:outline-none text-white mx-3 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Copy Link</button>

            </div>
            <h2 className='mb-2 mx-1 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white'>Team Member</h2>
            
<div className="relative overflow-x-auto mx-1">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1st
                </th>
                <td className="px-6 py-4">
                    Lord Rudy
                </td>
                <td className="px-6 py-4 flex">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2nd
                </th>
                <td className="px-6 py-4">
                    Rakesh Kumar
                </td>
                <td className="px-6 py-4 flex">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    3rd
                </th>
                <td className="px-6 py-4">
                    Chaman Tanishq
                </td>
                <td className="px-6 py-4 flex">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
                </td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    </React.Fragment>
  )
}
