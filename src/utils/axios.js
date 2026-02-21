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

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const requestWithRetry = async (config, retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await api(config);
        } catch (error) {
            console.log("Backend waking... retrying");
            await wait(5000);
        }
    }

    throw new Error("Server is waking up. Please try again.");
};

export default api;