import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getRestaurants = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/restaurants/`, {
      params: {
        latitude: query.lat,
        longitude: query.lng,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getFastFood = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/fastfood/`, {
      params: {
        latitude: query.lat,
        longitude: query.lng,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getCoffee = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/coffee/`, {
      params: {
        latitude: query.lat,
        longitude: query.lng,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getPizza = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/pizza/`, {
      params: {
        latitude: query.lat,
        longitude: query.lng,
      },
    })
    .then((res) => {
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

export const getDistance = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/distance/`, {
      params: {
        destinations: query.destinations,
        origins: query.origins,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getPlaceDetails = async ({ place_id }) => {
  let output = [];
  await axios
    .get(`${URL}/api/placedetails/`, {
      params: {
        place_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
