import axios from "axios";

const baseURL = "https://alaram.az/";
export const telegramBaseURL = `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_TOKEN}`;

const headers = {};

const axiosInstance = axios.create({ baseURL, headers: headers });

export default axiosInstance;
