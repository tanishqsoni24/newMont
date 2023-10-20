import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


export default function AddBankCard() {
    const navigate = useNavigate()
    const [bankCard, setBankCard] = useState({
        phone_number: '',
        card_holder_name: '',
        bank_name: '',
        card_number: '',
        ifsc_code: ''
    })
    const handleChange = text => e => {
        setBankCard({...bankCard, [text]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token = Cookies.get("session_id");
            const decoded = await jwt_decode(token);
            console.log(decoded.phone_number)

            const response = await axios.post('http://139.59.32.207/accounts/add-bank-card/',{
                phone_number: decoded.phone_number,
                card_holder_name: bankCard.card_holder_name,
                bank_name: bankCard.bank_name,
                card_number: bankCard.card_number,
                ifsc_code: bankCard.ifsc_code

            }, { headers: { 'Content-Type': 'application/json' } });

            if(response.data.status === "Success"){
                console.log('success')

                navigate('/bank-card')
            }


        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <section style={{marginTop:"8rem"}} className=" bg-gray-50 h-screen dark:bg-gray-900 py-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1  className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                    Add Bank Card
                </h1>
                <form className="space-y-4 md:space-y-6">
                <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accoun Holder Name</label>
                        <input  type="text"
                        onChange={handleChange('card_holder_name')}
                        name="first_name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rajesh" required=""/>
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Name</label>
                        <input 
                        type='text'
                        onChange={handleChange('bank_name')}

                          name='last_name'
                        id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Punjab National Bank" required=""/>
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Number</label>
                        <input type="number" 
                        onChange={handleChange('card_number')}
                        name="phone_number" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="75xxxxxxx6552" required=""/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSC code</label>
                        <input type="text"
                        onChange={handleChange('ifsc_code')}
                        name="password" id="password" placeholder="PUNB8244" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <button type="submit"
                    onClick={handleSubmit}
                    className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Add Bank Card</button>
    
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
