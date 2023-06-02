import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/authSlice";

const Login = () => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const loginUser = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    dispatch(authenticate({ username, password }));
  };
  // let loginUser = async (e) => {
  //   e.preventDefault();
  //   let response = await fetch("http://127.0.0.1:8000/api/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: e.target.username.value,
  //       password: e.target.password.value,
  //     }),
  //   });
  //   let data = await response.json();
  //   console.log("data: ", data);
  //   console.log("response: ", response);
  // if (response.status === 200) {
  //   setAuthTokens(data);
  //   setUser(jwt_decode(data.access));
  // } else {
  //   alert("Something went wrong");
  // }
  // };

  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
      </div>
      <form onSubmit={loginUser}>
        <input
          className="border"
          type="text"
          name="username"
          placeholder="Enter Username"
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
