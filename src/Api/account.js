import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const updateAccount = async (accountInfo) => {
  let output = [];
  await axios.post(`${URL}/api/updateaccount/`, accountInfo).then((res) => {
    output = res.data;
  });
  return output;
};
