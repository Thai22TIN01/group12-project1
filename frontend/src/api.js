import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // https://group12-project1-1.onrender.com
});

export default api;
