import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
const URL = REQ_URL;

export const getCart = createAsyncThunk(
  "cart/getcart",
  async ({ user_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/getcart/`, {
        params: {
          user_id,
        },
      });
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const addCart = createAsyncThunk(
  "cart/addcart",
  async (itemInfo, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/addcart/`, itemInfo);
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deletecart",
  async ({ user_id, cart_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/deletecart/`, {
        params: {
          user_id,
          cart_id,
        },
      });
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const addOneCart = createAsyncThunk(
  "cart/addonecart",
  async ({ user_id, cart_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/addonecart/`, {
        params: {
          user_id,
          cart_id,
        },
      });
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const minusOneCart = createAsyncThunk(
  "cart/minusoneCart",
  async ({ user_id, cart_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/minusonecart/`, {
        params: {
          user_id,
          cart_id,
        },
      });
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

const initialState = { cart: null };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
