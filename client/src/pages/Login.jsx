import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/general/Spinner";
import sign from "jwt-encode";
import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color");
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color");
    }}, []);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [ismobEmpty, setmobEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    phone_number: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (login.password.trim() === "" || login.phone_number.trim() === "") {
        setPasswordEmpty(true);
        setmobEmpty(true);
        setLoading(false);
        return;
      }
      const response = await axios.post(
        "https://stinghike.com/api/accounts/login/",
        login,
        { headers: { "Content-Type": "application/json" } }
      );
      //(response);
      //(response.data);
      setErrorMessage(response.data.message);
      if (response.data.status === "Success" && response.data.data.is_admin) {
        // decode the token
        //(response.data.data);
        // remove previous token
        Cookies.remove("session_id");
        Cookies.remove("admin_session_id");
        const token_data = {
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          phone_number: response.data.data.phone_number,
          invite_code: response.data.data.invite_code,
        };
        const token = await sign(token_data, "AuthSystemBuild", {
          expiresIn: "30d",
        });
        Cookies.set("admin_session_id", token, { expires: 30 });

        // redirect to home page
        navigate("/administ/portal", { replace: true })
        ;
      } 

      else if (response.data.status === "Success" && !response.data.data.is_admin) {
        // decode the token
        //(response.data.data);
        Cookies.remove("session_id");
        Cookies.remove("admin_session_id");
        const token_data = {
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          phone_number: response.data.data.phone_number,
          invite_code: response.data.data.invite_code,
        };
        const token = await sign(token_data, "AuthSystemBuild", {
          expiresIn: "30d",
        });
        Cookies.set("session_id", token, { expires: 30 });

        // redirect to home page
        window.location.href = "/";
      }
    } catch (err) {
      // //(err.message)
    }
    setLoading(false);
  };
  return (
    <section
      style={{ marginTop: "6rem" }}
      className="body-bg-color h-screen dark:bg-gray-900 py-auto"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          NewMount   
      </a> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-blue-900 md:text-4xl dark:text-white">
              Sting Hike
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone Number
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={login.phone_number}
                  name="phone_number"
                  id="email"
                  className={`${
                    ismobEmpty ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="7565889452"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  required
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={login.password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${
                    isPasswordEmpty ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  required=""
                />
              </div>
              <p className="text-sm text-red-500 dark:text-red-400">
                {isPasswordEmpty ? "credentials required" : ""}
              </p>

              <p className="text-sm text-red-500 text-center dark:text-red-400">
                {errorMessage}
              </p>
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {loading ? "Signing In..." : "Sign in"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
        {loading && <Spinner />}
      </div>
    </section>
  );
}
