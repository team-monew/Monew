import axios from "axios";

export const api = axios.create({
  baseURL: "/api/sb/monew/api",
  timeout: 10_000,
  withCredentials: true,
});
