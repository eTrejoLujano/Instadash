import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getDashboards = async () => {
  let output = [];
  await axios.get(`${URL}/api/dashboard/`).then((res) => {
    output = res.data;
  });
  return output;
};
