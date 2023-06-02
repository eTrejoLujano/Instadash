import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

const URL = REQ_URL;

export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return thunkAPI.dispatch(setToken(res.data));
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formVals, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/token/`, formVals);
      console.log("response: ", response);
      if (response.status === 200) {
        thunkAPI.dispatch(setToken(response.data));
        thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
      } else {
        alert("Something went wrong");
      }
      //   window.localStorage.setItem("token", data.access);
      //   thunkAPI.dispatch(me());
    } catch (authError) {
      console.log(authError);
      return thunkAPI.dispatch(setToken({ error: authError }));
    }
  }
);
const initialState = { token: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      window.localStorage.removeItem("token");
      history.push("/login");
      return {};
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
