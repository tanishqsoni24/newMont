import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/general/Spinner";
import Cookies from "js-cookie";
import sign from "jwt-encode";

export default function Signup() {
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color");
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color");
    };
  }, []);
  
  const validateForm = () => {
    const errors = {};

    if (!signup.first_name) {
      errors.first_name = "First name is required";
    }

    if (!signup.last_name) {
      errors.last_name = "Last name is required";
    }

    if (!signup.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (signup.phone_number.length !== 10) {
      errors.phone_number = "Phone number must be 10 digits";
    }

    if (!signup.password) {
      errors.password = "Password is required";
    }
    if (!signup.confirmPassword) {
      errors.password = "confirm password";
    }

    if (signup.password !== signup.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    invite_code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      try {
        //(signup);
        const response = await axios.post(
          "http://192.168.7.112:8000/accounts/signup/",
          signup,
          { headers: { "Content-Type": "application/json" } }
        );
        //(response);
  
        if (response.data.status === "Success") {
          //("success");
          // encode the token
          const token_data = {
            phone_number: signup.phone_number,
          };
  
          const token = await sign(token_data, "AuthSystemBuild", {
            expiresIn: "30d",
          });
  
          Cookies.set("phone_number", token, { expires: 30 });
          navigate("/otp");
        } else {
          if (response.data && response.data.status === "Error") {
            setErrorMessage(response.data.message);
          } else {
            setErrorMessage("An error occurred while signing up. Please try again later.");
          }
        }
      } catch (err) {
        //(err);
        setErrorMessage("An error occurred while signing up. Please try again later.");
      }
    }
    setLoading(false);
  };
  
  
  return (
    <section
      style={{ marginTop: "1rem", marginBottom: "7rem" }}
      className="body-bg-color h-screen dark:bg-gray-900  py-auto"
    >
      <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-blue-900 md:text-4xl dark:text-white">
              My GoldMalls
            </h1>
            
            <h1 className="text-xl font-light leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white">
              Sign up to new account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={signup.first_name}
                  name="first_name"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rajesh"
                />
              </div>
              {formErrors.first_name && (
                <p className="text-red-500">{formErrors.first_name}</p>
              )}
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={signup.last_name}
                  name="last_name"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Singh"
                />
              </div>
              {formErrors.last_name && (
                <p className="text-red-500">{formErrors.last_name}</p>
              )}
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your phone Number
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={signup.phone_number}
                  name="phone_number"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="7565889452"
                />
              </div>
              {formErrors.phone_number && (
                <p className="text-red-500">{formErrors.phone_number}</p>
              )}
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Create Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={signup.password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {formErrors.password && (
                <p className="text-red-500">{formErrors.password}</p>
              )}
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={signup.confirmPassword}
                  name="confirmPassword"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Invite code
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={signup.invite_code}
                  name="invite_code"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="75fhweb52"
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500">{formErrors.confirmPassword}</p>
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </form>

            <p className="text-sm text-red-500 text-center dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-52" >

        {loading && <Spinner />}
        </div>
      </div>
    </section>
  );
}
