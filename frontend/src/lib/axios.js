import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

if (!API_URL) {
    throw new Error("Add API_URL to the .env file");
}

// In development, API_URL should be base domain without /api (e.g., http://localhost)
// In production, API_URL should include full path with /api
const baseURL = API_PORT ? `${API_URL}:${API_PORT}/api` : API_URL;

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, // send cookies with requests
});

export default api;
