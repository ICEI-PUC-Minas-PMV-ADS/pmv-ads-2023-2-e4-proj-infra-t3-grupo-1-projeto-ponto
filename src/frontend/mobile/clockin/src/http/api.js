import axios from "axios";

const api = axios.create({
  baseURL: "http://20.226.234.84:80",
});

export default api;
