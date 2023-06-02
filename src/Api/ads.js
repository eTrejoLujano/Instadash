import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getAds = async () => {
  let output = [];
  await axios.get(`${URL}/api/ads/`).then((res) => {
    output = res.data;
  });
  return output;
};
