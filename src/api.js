import axios from "axios";

const api = axios.create({
  baseURL: "https://nodejs-ecommerce-1a21.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
