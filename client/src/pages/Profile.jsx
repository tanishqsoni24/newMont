import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from 'axios'
import sign  from "jwt-encode";

export default function Profile() {
    const [withdraw, setWithdraw] = useState(0)
    const [user, setUser] = useState({
        phone_number: '',
        name: '',
        wallet: '',
        recharge_amount: '',
        income: '',
        invite_code: '',
    })
    const [isRechargePopupOpen, setIsRechargePopupOpen] = useState(false);
    const openPopup = () => {
        setIsRechargePopupOpen(true);
    }
    const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);
    const openWithdrawPopup = () => {
        setIsWithdrawPopupOpen(true);
    }
    const closeWithdrawPopup = () => {
        setIsWithdrawPopupOpen(false);
    }

    const closePopup = () => {
        setIsRechargePopupOpen(false);
    }
    const [bankCardPopup, setBankCardPopup] = useState(false)
    const closeBankCardPopup = () => {
        setBankCardPopup(false)
    }
    const handelWithdraw = (e) => {
        e.preventDefault()
        try{
            // popup close
            closeWithdrawPopup()
            // popup for select bank card
            setBankCardPopup(true)
        }
        catch(err){
            console.log(err)
        }
    }
    const userDeatil = async () => {
        const token = Cookies.get("session_id");
        const decoded = await jwt_decode(token);
        console.log(decoded)
        const response = await axios.post('http://localhost:8000/accounts/userDetail/',{phone_number: decoded.phone_number}, { headers: { 'Content-Type': 'application/json' } });
        setUser({
            phone_number: decoded.phone_number,
            name: decoded.first_name + " " + decoded.last_name,
            invite_code: decoded.invite_code,
            wallet: response.data.data.wallet,
            recharge_amount: response.data.data.recharge_amount,
            income: response.data.data.income,
        })
        }
    useEffect(() => {
        userDeatil()

    }, [])

    const [recharge, setRecharge] = useState(0)

    const handelRecharge = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8000/accounts/recharge/',{amount: recharge, phone_number: user.phone_number}, { headers: { 'Content-Type': 'application/json' } });

            if(response.data.status === "Success"){

                console.log(response.data)

                // decode the token

                userDeatil()

                // close popup 
                closePopup()
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <React.Fragment>
            <div style={{ marginTop: "7rem" }} className="md:w-5/6 w-full mx-auto">
                <div className="profile flex my-5 flex-col items-center justify-center">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2ZWUgWURTHf6aphRYtPkQktoBh0L6QBElUBBJRL+0gES0PFUlU0EK0QBBClIE9RWJQBkVmRD20LyoVRGFEGxZqi0tFFJhLXPgPXOTzW2Y+mon8wcVx7rln/ve7c+ecOQO99PLPkAjMArYBJUA5cBY4CiwD+hNwUoDtQCPQFaZ9BPIJKCOB55bYx8AxrcoKrcQO4J7624BTwDwCRAZQJ4FVwJQI9nu7rdBlYAAB4JwE3dTtFYkEIAtYB9RrbCU+MwroBH4BY1yMzwSaNZkF+MhmiSjz4GNfHHx45pJErPTgY7x81OIj1RIRaYOHIxloB34rBvnCK03Ezf6waZOfZHzihQSM9uDDrEKHWiI+cUcTmenBxwj5aMBHyiViiQcfc+XjNj6yRyL2e/BxUD7MX9/Il4irHnzcl4/5+MhiiWhW6hErQ60nlkn9faNKIja6HJ8EHJCPM/hIXRziSK58mCegb1yRiFUefGyQj1J8ZL1EvAO2uhi/G3gfh3zNM32txNFE+VgwUfybXgPO+xnVHRL01DIpxhCiZ5p+gKcEiIsStSWGMcc15ggBYqFEfQDSorAfDvzQmHEEiD7AQwmrAFLD2A4C7srW1LsCx1jgpwQOC2M3WTafI9j5SkMUE5kgm2cEmHqJNHugJ3Jk85IA810iTWzJDtGfrYKcE0QDSY6Cm1NBNFltsSqRGTp2Mt0u7SfzdhgocoG3Vs50UpUR8/9XtS5VSkqsbMDcXjMIAFOB04rqRtgDIF19Jj60WivQYsWMwUCNzndo8tP/tnhT311t1bTsZiqPDjtD9Jtz3auUdqsBCiLEIc+kScgn68LNSjEKrX2Rpzquc2vZrV19edZ+KZSPJsvuC7DLWt24Re1Ncu5c6BGwBuhn2R22RLTouAh4olZk3WKOLzPGwaxCQbeVblL+ZjR4wny3uGY5Nm9xc8JMuMKyvaBX2Vq1JJ1z+ivCCJwN3LJsrwMD3U4i1cqfzOeyRVGMSdd7fJWOl1pilofojyYZbbQ+Itl3QNQUy8EbfZhxww1rIm4LcJnAa/k4EevgbD3zzeac5FJAVrcA2alvjW6YaFXsQ2UMPXJIFzfFBbesDfHUMp/b3FLppiLpBCsjxi2lISZSFocfpjqWQXZEDlprjSVydwW8pbha0156+Y/5A+i7dzTeZORWAAAAAElFTkSuQmCC" />
                    <h2 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>{user.name}</h2>
                    <h2 className='mb-2 text-sm font-semibold tracking-tight text-gray-600 my-1 dark:text-white'>+91 {user.phone_number}</h2>
                </div>
                <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between">


                    <div className="mx-4 flex flex-col item-center justify-center">
                        <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹{user.wallet}.00</h2>
                        <p>Cash</p>
                    </div>
                    <div className="teamSize flex mx-4 flex-col item-center justify-center">
                    <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800" onClick={openPopup}>Recharge</button>
                    <button type="button" class="text-emerald-900 bg-white border border-emerald-700 focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-emerald-600 dark:hover:bg-emerald-700 dark:hover:border-emerald-600 dark:focus:ring-emerald-700" onClick={openWithdrawPopup}>Withdraw</button>
                    </div>
                </div>
                <h2 className='mb-2 mx-1 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white'>Account Details</h2>
                <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                    <div className="mx-4 flex flex-col item-center justify-center">
                        <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹{user.income}</h2>
                        <p>Income</p>
                    </div>
                    <div className="teamSize flex mx-4 flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹{user.recharge_amount}</h2>
                        <p>Recharge Amount</p>
                    </div>
                </div>
                <h2 className='mb-2 mx-1 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white'>Common Functions</h2>

                <div className="border mx-3 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-around">
                    <div className="income-details my-3 mx-auto">
                    <Link to='/income'>
                    <img width="32" height="32"  className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/expensive-2--v1.png" alt="expensive-2--v1"/>
                    <p className='mx-auto text-center'>Income Details</p>
                    </Link>
                    </div>
                    <div className="order my-3 mx-auto">
                    <Link to='/orders'>
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/add-shopping-cart--v1.png" alt="add-shopping-cart--v1"/>
                    <p className='mx-auto text-center'>Order</p>
                    </Link>
                    </div>
                    <div className="bank-card mx-auto my-3">
                    <Link to='/bank-card'>
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/card-verification-value.png" alt="card-verification-value"/>
                    <p className='mx-auto text-center'>Bank Card</p>
                    </Link> 
                    </div>
                    <div className="forgot-password mx-auto my-3">
                        <Link to='/change-password'>
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/lock--v1.png" alt="lock--v1"/>
                    <p className='mx-auto text-center'>Change Password</p>
                    </Link>
                    </div>
                    <div className="delete-account mx-auto my-3">
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/trash--v1.png" alt="trash--v1"/> 
                    <p className='mx-auto text-center'>Delete Account</p>
                    </div>
                    <div className="download mx-auto my-3">
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/downloads-folder--v1.png" alt="downloads-folder--v1"/>
                    <p className='mx-auto text-center'>Download</p>
                    </div>
                    <div className="recharge-record mx-auto my-3">
                    <Link to='/recharge-record'>
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/money-bag.png" alt="money-bag"/>
                    <p className='mx-auto text-center'>Recharge Record</p>
                    </Link>
                    </div>
                    <div className="withdraw-record mx-auto my-3">
                        <Link to='/withdraw-record'>
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/ios/50/0E9F6E/banknotes.png" alt="banknotes"/>
                    <p className='mx-auto text-center'>Withdraw Record</p>
                    </Link>
                    </div>
                    <div className="logout mx-auto my-5">
                        <button onClick={()=>{
                            Cookies.remove("session_id")
                            window.location.href = "/login"
                        }}>

                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/windows/32/0E9F6E/exit.png" alt="exit"/>
                    <p className='mx-auto text-center'>logout</p>
                    </button>
                    </div>
                    </div>

            </div>

            {isRechargePopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem" }}
              className="flex flex-col justify-center items-end"
            >
              <img
                onClick={closePopup}
                width="20"
                height="20"
                className="mb-1"
                src="https://img.icons8.com/ios-glyphs/30/014737/delete-sign.png"
                alt="delete-sign"
              />
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  Recharge Amount
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                      <input type="number"
                      onChange={(e)=>setRecharge(e.target.value)}
                    value={recharge==0? "": recharge}
                      name="recharge" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="750" required=""/>
                  </div>
                  <button type="submit" onClick={handelRecharge} className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Process</button>
              </form>
          </div>
      </div>
            </div>
            </div>
            )}


{isWithdrawPopupOpen && (
          <div
            id="pop"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
          >
            <div
              style={{ width: "20rem" }}
              className="flex flex-col justify-center items-end"
            >
              <img
                onClick={closeWithdrawPopup}
                width="20"
                height="20"
                className="mb-1"
                src="https://img.icons8.com/ios-glyphs/30/014737/delete-sign.png"
                alt="delete-sign"
              />
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  Withdraw Request
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Withdraw Amount</label>
                      <input type="number"
                      onChange={(e)=>setWithdraw(e.target.value)}
                    value={withdraw==0? "": withdraw}
                      name="recharge" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="750" required=""/>
                  </div>
                  <button type="submit" onClick={handelWithdraw} className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Process</button>
              </form>
          </div>
      </div>
            </div>
            </div>
            )}

{bankCardPopup && (
            <div
                id="pop"
                className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-20"
            >
                <div
                style={{ width: "40rem" }}
                className="flex flex-col justify-center items-end"
                >
                <img
                    onClick={closeBankCardPopup}
                    width="20"
                    height="20"
                    className="mb-1"
                    src="https://img.icons8.com/ios-glyphs/30/014737/delete-sign.png"
                    alt="delete-sign"
                />
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  Select Bank Card
              </h1>
              <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <p className="font-normal text-gray-700 dark:text-gray-400">
        Bank Name: Punjab National Bank <br />
        Account Holder Name: Rajesh <br />
        Account Number: 756xxxx5452 <br />
        IFSC Code : PUNB8244 <br />
    </p>
</a>
                  <button type="submit" onClick={handelWithdraw} className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Process</button>
              
          </div>
      </div>
                </div>
                </div>
            )}
        </React.Fragment>
    )
}
