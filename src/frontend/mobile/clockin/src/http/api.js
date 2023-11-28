import axios from "axios";

const api = axios.create({
  baseURL: "https://clockin.azurewebsites.net",
});
export default api;
