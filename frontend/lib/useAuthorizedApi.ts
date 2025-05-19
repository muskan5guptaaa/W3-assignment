"use client"
import { useAuthStore } from "./authStore";
import axios from "axios";

export const useAuthorizedApi = () => {
const token = useAuthStore((s) => s.token);
const instance = axios.create({
baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
if (token) config.headers.Authorization = `Bearer ${token}`;
console.log("Request config:", config);
return config;
});

return instance;
}