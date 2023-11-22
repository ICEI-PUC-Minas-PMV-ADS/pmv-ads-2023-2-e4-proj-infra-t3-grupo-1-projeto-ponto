import axios from "axios";

const api = axios.create({
  baseURL: "http://clockin.bmddhadwg0esdeeb.brazilsouth.azurecontainer.io:80",
});

export default api;
