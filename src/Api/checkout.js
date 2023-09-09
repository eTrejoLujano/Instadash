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

export const updateCart = async (orderInfo) => {
  let output = [];
  await axios.post(`${URL}/api/updatecart/`, orderInfo).then((res) => {
    output = res.data;
  });
  return output;
};
