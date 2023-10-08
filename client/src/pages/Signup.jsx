import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Spinner from '../components/general/Spinner'

export default function Signup() {
    const navigate = useNavigate();
    const[loading,setLoading]=useState(false)
    const [signup , setSignup] = useState({
        first_name:'',
        last_name:'',
        phone_number:'',
        password:'',
        confirmPassword:'',
        invite_code:''
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setSignup({...signup,[name]:value})
    }
    const handleSubmit = async (e)=>{
        setLoading(true);
        try{
            e.preventDefault()
            console.log(signup)
            const response = await axios.post('http://127.0.0.1:8000/accounts/signup/',signup ,{ headers: { 'Content-Type': 'application/json' } });
            console.log(response)

            if(response.status === 200){
                console.log('success')
            }

            // push the url to /otp 
            navigate('/otp')

        }
        catch(err){
            console.log(err)
        }
        setLoading(false);
    }
  return (
    <section style={{marginTop:"7rem", marginBottom:"7rem"}} className=" bg-gray-50 h-screen dark:bg-gray-900 py-auto">
  <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1  className="text-2xl font-semibold leading-tight tracking-tight text-emerald-900 md:text-4xl dark:text-white">
                  New Mont
              </h1>
              <h1  className="text-xl font-light leading-tight tracking-tight text-emerald-900 md:text-2xl dark:text-white">
                  Sign up to new account
              </h1>
              <form className="space-y-4 md:space-y-6">
              <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input  type="text"
                      onChange={handleChange}
                        value={signup.first_name}
                      name="first_name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rajesh" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input 
                      type='text'
                        onChange={handleChange}
                        value={signup.last_name}
                        name='last_name'
                      id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Singh" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone Number</label>
                      <input type="number" 
                      onChange={handleChange}
                        value={signup.phone_number}
                      name="phone_number" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7565889452" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Password</label>
                      <input type="password"
                      onChange={handleChange}
                        value={signup.password}
                      name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input type="password"
                      onChange={handleChange}
                        value={signup.confirmPassword}
                      name="confirmPassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invite code</label>
                      <input type="text"
                      onChange={handleChange}
                        value={signup.invite_code}
                      name="invite_code" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="75fhweb52" required=""/>
                  </div>
                  <button type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{loading ? 'Signing up...' : 'Sign up'}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Have an account? <Link to="/login" className="font-medium text-emerald-600 hover:underline dark:text-emerald-500">Sign in</Link>
                  </p>
              </form>
          </div>
      </div>
      {loading && <Spinner/>}
  </div>
</section>
  )
}
