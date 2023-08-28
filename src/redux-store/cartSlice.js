import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
const URL = REQ_URL;

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ user_id }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/getcart/`, { user_id });
      return thunkAPI.dispatch(setCart(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const addCart = createAsyncThunk(
  "cart/getCart",
  async (itemInfo, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/addcart/`, itemInfo);
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
