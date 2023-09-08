import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
import * as storeAPI from "../Api/store";
import * as pickupAPI from "../Api/pickup";
const URL = REQ_URL;

export const availableStores = createAsyncThunk(
  "store/availableStores",
  async (query, thunkAPI) => {
    try {
      let allRestaurants = [];
      const urlPaths = [
        pickupAPI.getRestaurants,
        pickupAPI.getFastFood,
        pickupAPI.getCoffee,
        pickupAPI.getPizza,
        pickupAPI.getGrocery,
        pickupAPI.getDrugstore,
        pickupAPI.getConvenience,
      ];
      await Promise.all(
        urlPaths.map(async (urlPath) => {
          const result = await urlPath({
            lat: +query.latitude,
            lng: +query.longitude,
          });
          allRestaurants = [...allRestaurants, ...result.results];
        })
      );
      let availableStores = await storeAPI.getAllStores();
      availableStores = availableStores.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      allRestaurants = allRestaurants.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      let mappedStores = [];
      let storeIndex = 0;
      let restaurantIndex = 0;
      while (
        (storeIndex < availableStores.length &&
          restaurantIndex < allRestaurants.length) ||
        restaurantIndex == allRestaurants.length
      ) {
        if (
          availableStores[storeIndex].name ==
          allRestaurants[restaurantIndex].name
        ) {
          mappedStores.push({
            ...allRestaurants[restaurantIndex],
            ...availableStores[storeIndex],
          });
          restaurantIndex += 1;
        }
        if (
          availableStores[storeIndex].name !==
          allRestaurants[restaurantIndex].name
        ) {
          const compare = availableStores[storeIndex].name.localeCompare(
            allRestaurants[restaurantIndex].name
          );
          if (compare == -1) {
            storeIndex += 1;
          } else {
            restaurantIndex += 1;
          }
        }
      }

      return await thunkAPI.dispatch(setStores(mappedStores));
    } catch (authError) {
      console.error(authError);
    }
  }
);
const initialState = {};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStores } = storeSlice.actions;
export default storeSlice.reducer;
