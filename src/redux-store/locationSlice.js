import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";

const URL = REQ_URL;

export const currentAddress = createAsyncThunk(
  "location/currentAddress",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/latestaddress/`, {
        params: {
          user_id: query.user_id,
        },
      });
      console.log("reponse data", response.data);
      thunkAPI.dispatch(setLocate(response.data));
    } catch (authError) {
      console.error(authError);
    }
  }
);

export const locate = createAsyncThunk(
  "location/locate",
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

const initialState = { location: null };

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocate: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocate } = locationSlice.actions;
export default locationSlice.reducer;
