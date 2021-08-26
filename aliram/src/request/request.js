import axios from "axios";

const baseURL = "https://alaram.az/";

const headers = {};

const axiosInstance = axios.create({ baseURL, headers: headers });

export default axiosInstance;
