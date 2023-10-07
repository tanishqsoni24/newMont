import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
    return (
        <React.Fragment>
            <div style={{ marginTop: "7rem" }} className="md:w-5/6 w-full mx-auto">
                <div className="profile flex my-5 flex-col items-center justify-center">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2ZWUgWURTHf6aphRYtPkQktoBh0L6QBElUBBJRL+0gES0PFUlU0EK0QBBClIE9RWJQBkVmRD20LyoVRGFEGxZqi0tFFJhLXPgPXOTzW2Y+mon8wcVx7rln/ve7c+ecOQO99PLPkAjMArYBJUA5cBY4CiwD+hNwUoDtQCPQFaZ9BPIJKCOB55bYx8AxrcoKrcQO4J7624BTwDwCRAZQJ4FVwJQI9nu7rdBlYAAB4JwE3dTtFYkEIAtYB9RrbCU+MwroBH4BY1yMzwSaNZkF+MhmiSjz4GNfHHx45pJErPTgY7x81OIj1RIRaYOHIxloB34rBvnCK03Ezf6waZOfZHzihQSM9uDDrEKHWiI+cUcTmenBxwj5aMBHyiViiQcfc+XjNj6yRyL2e/BxUD7MX9/Il4irHnzcl4/5+MhiiWhW6hErQ60nlkn9faNKIja6HJ8EHJCPM/hIXRziSK58mCegb1yRiFUefGyQj1J8ZL1EvAO2uhi/G3gfh3zNM32txNFE+VgwUfybXgPO+xnVHRL01DIpxhCiZ5p+gKcEiIsStSWGMcc15ggBYqFEfQDSorAfDvzQmHEEiD7AQwmrAFLD2A4C7srW1LsCx1jgpwQOC2M3WTafI9j5SkMUE5kgm2cEmHqJNHugJ3Jk85IA810iTWzJDtGfrYKcE0QDSY6Cm1NBNFltsSqRGTp2Mt0u7SfzdhgocoG3Vs50UpUR8/9XtS5VSkqsbMDcXjMIAFOB04rqRtgDIF19Jj60WivQYsWMwUCNzndo8tP/tnhT311t1bTsZiqPDjtD9Jtz3auUdqsBCiLEIc+kScgn68LNSjEKrX2Rpzquc2vZrV19edZ+KZSPJsvuC7DLWt24Re1Ncu5c6BGwBuhn2R22RLTouAh4olZk3WKOLzPGwaxCQbeVblL+ZjR4wny3uGY5Nm9xc8JMuMKyvaBX2Vq1JJ1z+ivCCJwN3LJsrwMD3U4i1cqfzOeyRVGMSdd7fJWOl1pilofojyYZbbQ+Itl3QNQUy8EbfZhxww1rIm4LcJnAa/k4EevgbD3zzeac5FJAVrcA2alvjW6YaFXsQ2UMPXJIFzfFBbesDfHUMp/b3FLppiLpBCsjxi2lISZSFocfpjqWQXZEDlprjSVydwW8pbha0156+Y/5A+i7dzTeZORWAAAAAElFTkSuQmCC" />
                    <h2 className='mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>Tanishq</h2>
                    <h2 className='mb-2 text-sm font-semibold tracking-tight text-gray-600 my-1 dark:text-white'>+91 70****1844</h2>

                </div>
                <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between">


                    <div className="mx-4 flex flex-col item-center justify-center">
                        <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹27000.00</h2>
                        <p>Cash</p>
                    </div>
                    <div className="teamSize flex mx-4 flex-col item-center justify-center">
                    <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Recharge</button>
                    <button type="button" class="text-emerald-900 bg-white border border-emerald-700 focus:outline-none hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-emerald-600 dark:hover:bg-emerald-700 dark:hover:border-emerald-600 dark:focus:ring-emerald-700">Withdraw</button>
                    </div>
                </div>
                <h2 className='mb-2 mx-1 text-2xl font-semibold tracking-tight text-gray-900 my-5 dark:text-white'>Account Details</h2>
                <div className="border mx-1 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-around">


                    <div className="mx-4 flex flex-col item-center justify-center">
                        <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹568.00</h2>
                        <p>Income</p>
                    </div>
                    <div className="teamSize flex mx-4 flex-col item-center justify-center">
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>₹5668.00</h2>
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
                    <img width="32" height="32" className='mx-auto' src="https://img.icons8.com/windows/32/0E9F6E/exit.png" alt="exit"/>
                    <p className='mx-auto text-center'>logout</p>
                    </div>
                    </div>

            </div>
        </React.Fragment>
    )
}
