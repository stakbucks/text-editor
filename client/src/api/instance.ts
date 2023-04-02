import axios, { AxiosRequestConfig } from "axios";
const BASE_URL = "localhost:4000";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};
export const baseApi = axios.create(axiosConfig);
