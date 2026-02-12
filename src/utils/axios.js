import axios from "axios";

// It will work: every time a request is made with that axios instance (in the same runtime), it will attach the Authorization header.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// const api = axios.interceptors.request.use((config) => {
//   const token = store.getState().auth?.user?.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// })

export default api;