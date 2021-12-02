import axios from "axios";

const api = axios.create({
  baseURL: "http://6270-179-108-248-122.ngrok.io",
});

export default api;
