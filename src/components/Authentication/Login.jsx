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
    <div>
      <div>
        <Link to="/home">Home</Link>
      </div>
      {auth.user && <>Hello {auth.user.email}</>}
      <>{auth.user ? <p>Logout</p> : <Link to="/">login</Link>}</>
      <form onSubmit={loginUser}>
        <input
          className="border"
          type="text"
          name="email"
          placeholder="Enter Email"
        />
        <input
          className="border"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <input className="border" type="submit" />
      </form>
    </div>
  );
};

export default Login;
