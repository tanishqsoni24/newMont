import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode'

export default function ChangePassword() {
    const [changePassword, setChangePassword] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {  
        e.preventDefault()
        const token = Cookies.get("session_id");
        const decoded = jwt_decode(token);
        const phone_number = decoded.phone_number;
        if(changePassword.newPassword === changePassword.confirmPassword){
            const response = await axios.post("http://localhost:8000/accounts/changePassword/", {
                phone_number: phone_number,
                oldPassword: changePassword.oldPassword,
                newPassword: changePassword.newPassword
            }, {"content": "application/json"})
            console.log(response)
            if(response.data.status === "Success"){
                alert("password changed")
            }
        }else{
            alert("password not match")
        }
    }

  return (
    <section style={{marginTop:"4rem"}} className="bg-gray-50 h-screen dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  Change Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original Password</label>
                      <input type="password"
                        name="oldPassword"
                        onChange={handleChange}
                        value={changePassword.oldPassword}
                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                      <input type="password" 
                        name="newPassword"
                        onChange={handleChange}
                        value={changePassword.newPassword}
                      id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input type="password"
                        onChange={handleChange}
                        name="confirmPassword"
                        value={changePassword.confirmPassword}
                       id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••" required=""/>
                  </div>
                  <button type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Chnage Password</button>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
