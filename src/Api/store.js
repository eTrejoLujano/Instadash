import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getStoreById = async ({ store_id }) => {
  let output = [];
  await axios
    .get(`${URL}/api/storeid/`, {
      params: {
        store_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getStoreByName = async ({ store_name }) => {
  let output = [];
  await axios
    .get(`${URL}/api/storename/`, {
      params: {
        store_name,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getAllStores = async () => {
  let output = [];
  await axios.get(`${URL}/api/allstores/`).then((res) => {
    output = res.data;
  });
  return output;
};
