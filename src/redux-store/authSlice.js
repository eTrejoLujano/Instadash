import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

const URL = REQ_URL;
export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const response = await axios.post(`${URL}/api/token/refresh/`, {
      refresh: token.refresh,
    });
    if (response.status === 200) {
      window.localStorage.setItem("token", JSON.stringify(response.data));
      thunkAPI.dispatch(setToken(response.data));
      thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
    } else {
      thunkAPI.dispatch(logout());
      alert("You've been timed out");
    }
  } catch (authError) {
    console.error(authError);
  }
  // const token = JSON.parse(window.localStorage.getItem("token"));
  // if (token) {
  //   thunkAPI.dispatch(setToken(token));
  //   thunkAPI.dispatch(setUser(jwt_decode(token.access)));
  //   // const response = await axios.get(`${URL}/api/latestaddress/`, {
  //   //   params: {
  //   //     user_id: jwt_decode(token.access).user_id,
  //   //   },
  //   // });
  //   // return await thunkAPI.dispatch(setLocate(response.data));
  // }
  // return;
});

export const currentAddress = createAsyncThunk(
  "auth/currentAddress",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/latestaddress/`, {
        params: {
          user_id: query.user_id,
        },
      });
      if (response.status === 200) {
        return thunkAPI.dispatch(setLocate(response.data));
      } else {
        return;
      }
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const changeAddress = createAsyncThunk(
  "auth/changeAddress",
  async ({ address_id, user_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/changeaddress/`, {
        params: {
          address_id,
          user_id,
        },
      });
      return thunkAPI.dispatch(setLocate(response.data[0]));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "auth/deleteAddress",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/deleteaddress/`, {
        params: {
          user_id: query.user_id,
          address_id: query.address_id,
        },
      });
      return thunkAPI.dispatch(setLocate(response.data[0]));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const locate = createAsyncThunk(
  "auth/locate",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/address/`, {
        params: {
          address: query.address,
          latitude: query.latitude,
          longitude: query.longitude,
          user_id: query.user_id,
        },
      });
      thunkAPI.dispatch(setLocate(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formVals, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/token/`, formVals);
      if (response.status === 200) {
        window.localStorage.setItem("token", JSON.stringify(response.data));
        thunkAPI.dispatch(setToken(response.data));
        thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
      } else {
        alert("Something went wrong");
      }
    } catch (authError) {
      console.error(authError);
      return thunkAPI.dispatch(setToken({ error: authError }));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formVals, thunkAPI) => {
    try {
      const register = await axios.post(`${URL}/api/register/`, formVals);
      if (register.status === 201) {
        const response = await axios.post(`${URL}/api/token/`, formVals);
        if (response.status === 200) {
          window.localStorage.setItem("token", JSON.stringify(response.data));
          thunkAPI.dispatch(setToken(response.data));
          thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
        } else {
          alert("Token Error");
        }
      } else {
        alert("Registration Error");
      }
    } catch (authError) {
      console.error(authError);
      return thunkAPI.dispatch(setToken({ error: authError }));
    }
  }
);

export const updateToken = createAsyncThunk(
  "auth/updateToken",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const response = await axios.post(`${URL}/api/token/refresh/`, {
        refresh: token.refresh,
      });
      if (response.status === 200) {
        window.localStorage.setItem("token", JSON.stringify(response.data));
        thunkAPI.dispatch(setToken(response.data));
        thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
      } else {
        thunkAPI.dispatch(logout());
        alert("Something went wrong");
      }
    } catch (authError) {
      console.error(authError);
    }
  }
);

const initialState = { token: null, user: null, location: null };

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
    setLocate: (state, action) => {
      state.location = action.payload;
    },
    logout: () => {
      window.localStorage.removeItem("token");
      return {};
    },
  },
});

export const { setToken, setUser, setCart, setLocate, logout } =
  authSlice.actions;
export default authSlice.reducer;
