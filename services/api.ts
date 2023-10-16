import axios from "axios";

const route = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "";

const api = axios.create({
  baseURL: `${route}/api`,
});

export default api;
