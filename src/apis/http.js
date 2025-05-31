import axios from "axios";
// console.log(import.meta.env.BACKEND_BASE_URL)
const http = axios.create({
    // baseURL: 'http://localhost:1100',
    // baseURL: 'https://backend.africana.moniclan.com',
    baseURL: 'https://africana-backend.onrender.com',
});

http.interceptors.request.use((config) => { 
    const { intercept = true } = config;
    if (!intercept) return config;
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export default http;