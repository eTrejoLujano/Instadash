import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getStore = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/store/`, {
      params: {
        store_id: query.store_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
