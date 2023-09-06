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
      let availableStores = await storeAPI.getAllStores();
      const restaurantsOptions = await pickupAPI.getRestaurants({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const fastfoodOptions = await pickupAPI.getFastFood({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const coffeeOptions = await pickupAPI.getCoffee({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const pizzaOptions = await pickupAPI.getPizza({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const groceryOptions = await pickupAPI.getGrocery({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const drugstoreOptions = await pickupAPI.getDrugstore({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      const convenienceOptions = await pickupAPI.getConvenience({
        lat: +query.latitude,
        lng: +query.longitude,
      });
      availableStores = availableStores.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      let allRestaurants = [
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
        ...coffeeOptions.results,
        ...pizzaOptions.results,
        ...groceryOptions.results,
        ...drugstoreOptions.results,
        ...convenienceOptions.results,
      ];
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
          mappedStores.push(allRestaurants[restaurantIndex]);
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
      return thunkAPI.dispatch(setStores(mappedStores));
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
