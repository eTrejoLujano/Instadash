import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux-store/authSlice";
import { useNavigate } from "react-router-dom";
import { makeEmail } from "../Util/helperFunctions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let password2 = e.target.password2.value;
    let first_name = e.target.firstName.value;
    let last_name = e.target.lastName.value;
    dispatch(register({ email, password, password2, first_name, last_name }));
    navigate("/");
  };
  const guestRegistration = () => {
    let email = makeEmail();
    let password = "guest123#";
    let password2 = "guest123#";
    let first_name = "guest";
    let last_name = "login";
    dispatch(register({ email, password, password2, first_name, last_name }));
    navigate("/");
  };

  let inputStyling =
    "border h-[2.8rem] w-[11rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";

  return (
    <div className="h-full w-full pt-20">
      <div className="flex flex-col h-full items-center justify-center space-y-[1.2rem]">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">Sign Up</p>
          <div className="flex space-x-1">
            <p className="text-gray-400">Already have an account?</p>
            <p
              className="text-red-500 font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sign In
            </p>
          </div>
        </div>
        <form
          onSubmit={registerUser}
          className="flex flex-col space-y-[2.5rem]"
        >
          <div className="flex space-x-[1rem]">
            <div>
              <p>First Name</p>
              <input
                className={inputStyling}
                type="text"
                name="firstName"
                placeholder=""
              />
            </div>
            <div>
              <p>Last Name</p>
              <input
                className={inputStyling}
                type="text"
                name="lastName"
                placeholder=""
              />
            </div>
          </div>
          <div>
            <p>Email</p>
            <input
              className="border h-[2.8rem] w-[23rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4"
              type="text"
              name="email"
            />
          </div>
          <div className="flex space-x-[1rem]">
            <div>
              <p>Password</p>
              <input className={inputStyling} type="password" name="password" />
            </div>
            <div>
              <p>Confirm Password</p>
              <input
                className={inputStyling}
                type="password"
                name="password2"
              />
            </div>
          </div>
          <button
            className="border rounded-full h-[3.4rem] bg-red-500 text-white text-xl"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center space-x-[1rem]">
          <div className="w-[9.8rem] h-[.05rem] rounded bg-gray-500"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="w-[9.8rem] h-[.05rem] rounded bg-gray-500"></div>
        </div>
        <button
          className="border rounded-full h-[3.4rem] w-[23rem] bg-red-500 text-white text-xl"
          onClick={() => guestRegistration()}
        >
          Continue as guest (Demo)
        </button>
      </div>
    </div>
  );
};

export default SignUp;
