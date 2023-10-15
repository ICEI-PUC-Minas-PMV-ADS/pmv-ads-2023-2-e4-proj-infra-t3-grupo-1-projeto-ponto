import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.13:8000",
  //baseURL: "http://170.239.223.159:8000",
});

export default api;
