import Axios from "axios";
import { API_URL } from "../../config/configAPI";

Axios.defaults.withCredentials = true;

export const axiosApi = Axios.create({
    baseURL: API_URL
});
