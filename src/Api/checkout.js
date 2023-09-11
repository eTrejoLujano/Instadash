import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const createOrder = async (orderInfo) => {
  let output = [];
  await axios.post(`${URL}/api/createorder/`, orderInfo).then((res) => {
    output = res.data;
  });
  return output;
};

export const checkout = async (orderInfo) => {
  let output = [];
  await axios.post(`${URL}/api/updatecart/`, orderInfo).then((res) => {
    output = res.data;
  });
  return output;
};

export const getOrders = async ({ user_id }) => {
  let output = [];
  await axios
    .get(`${URL}/api/getorders/`, {
      params: {
        user_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
