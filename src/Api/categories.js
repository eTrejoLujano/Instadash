import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const getCategories = async () => {
  let output = [];
  await axios.get(`${URL}/api/categories/`).then((res) => {
    output = res.data;
  });
  return output;
};

export const getCategoryPick = async (query) => {
  let output = [];
  await axios
    .get(`${URL}/api/storecategory/`, {
      params: {
        category_id: query.category_id,
      },
    })
    .then((res) => {
      output = res.data;
    });
  return output;
};
