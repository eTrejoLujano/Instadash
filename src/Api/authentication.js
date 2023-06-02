import axios from "axios";
import { REQ_URL } from "../components/Util/constants";

const URL = REQ_URL;

export const createUser = axios.create(`${URL}/register/`);
