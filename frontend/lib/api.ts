import axios from "axios";

const API = axios.create({
  baseURL: "https://nesxtjs-and-express-blog-app-production.up.railway.app",
  withCredentials: true,
});

export default API;
