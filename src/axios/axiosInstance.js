import axios from 'axios'

const Url = import.meta.env.VITE_BASE_URL
console.log(Url, "baseurl")
const axiosInstance = axios.create({
    baseURL: Url,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `Bearer${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { axiosInstance }