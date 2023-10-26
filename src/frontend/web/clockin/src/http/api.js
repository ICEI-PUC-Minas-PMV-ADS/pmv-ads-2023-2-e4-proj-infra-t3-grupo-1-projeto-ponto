import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8001",
  //baseURL: "http://170.239.223.159:8000",
});

export default api;
