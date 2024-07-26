import axios from "axios";

const api = axios.create({
  baseURL: "https://labfoods-github.onrender.com/",
});

export default api;
