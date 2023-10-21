import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getAllAddresses = async ({ user_id }) => {
  let output = [];
  await axios
    .get(`${URL}/api/alladdresses/`, {
      params: {
        user_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};

export const getAddressCoordinates = async ({ address }) => {
  let output = [];
  await axios
    .get(`${URL}/api/addresscoordinates/`, {
      params: {
        address,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
