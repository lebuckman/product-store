import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("Add API_URL to the .env file");
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // send cookies with requests
});

export default api;
