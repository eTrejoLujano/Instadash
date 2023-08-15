import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getRestaurants = async () => {
  let output = [];
  await axios.get(`${URL}/api/restaurants/`).then((res) => {
    output = res.data;
  });
  return output;
};

export const getFastFood = async () => {
  let output = [];
  await axios.get(`${URL}/api/fastfood/`).then((res) => {
    output = res.data;
  });
  return output;
};

export const getStorePickup = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/storepickup/`, {
      params: {
        store_name: query.store_name,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
