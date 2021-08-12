import axios from "axios";

const baseURL = "http://localhost:5000";

const headers = {};

const axiosInstance = axios.create({ baseURL, headers: headers });

export default axiosInstance;
