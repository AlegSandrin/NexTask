import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}/api`,
});

export default api;
