import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    dispatch(authenticate({ email, password }));
    navigate("/");
  };
  let inputStyling =
    "border h-[2.8rem] w-[26rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-full items-center justify-center relative space-y-[1.8rem]">
        <div className="flex flex-col items-center space-y-[2rem]">
          <div className="font-bold text-2xl">Login</div>
          <div className="rounded-full flex border-none w-[10rem] h-[2rem] bg-gray-200">
            <div
              className="cursor-pointer rounded-full w-[4.7rem] h-[2rem] 
            bg-black text-white flex flex-col items-center justify-center 
            font-semibold text-md"
            >
              Sign In
            </div>
            <div
              className="pl-3 justify-center flex flex-col cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </div>
          </div>
        </div>
        <form onSubmit={loginUser} className="flex flex-col space-y-[2.5rem]">
          <div>
            <p>Email</p>
            <input className={inputStyling} type="text" name="email" />
          </div>
          <div>
            <p>Password</p>
            <input className={inputStyling} type="password" name="password" />
          </div>
          <button
            className="border rounded-full h-[3.4rem] bg-red-500 text-white text-xl"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
