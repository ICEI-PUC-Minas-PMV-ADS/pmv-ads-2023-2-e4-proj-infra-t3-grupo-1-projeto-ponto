import axios from "axios";

const api = axios.create({
  // baseURL: "https://localhost:8001",
  baseURL: "http://192.168.2.15:8000",
});

export default api;
