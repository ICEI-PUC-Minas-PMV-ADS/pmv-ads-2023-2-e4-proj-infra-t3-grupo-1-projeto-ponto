import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.2.13:8001",
});

export default api;
