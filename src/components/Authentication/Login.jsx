import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/authSlice";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  console.log("the auth", auth);
  const dispatch = useDispatch();
  const loginUser = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    dispatch(authenticate({ email, password }));
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-full items-center justify-center relative">
        {/* <div>
          <Link to="/home">Home</Link>
        </div> */}
        <form onSubmit={loginUser} className="flex flex-col space-y-[2.5rem]">
          <input
            className="border h-[2.8rem] w-[26rem] rounded-md"
            type="text"
            name="email"
            placeholder="Enter Email"
          />
          <input
            className="border h-[2.8rem] rounded-md"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
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
