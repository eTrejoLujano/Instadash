import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getAllAddresses = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/alladdresses/`, {
      params: {
        user_id: query.user_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
