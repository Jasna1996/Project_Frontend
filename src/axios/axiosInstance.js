import axios from 'axios'

const Url = import.meta.env.VITE_BASE_URL
console.log(Url, "baseurl")
const axiosInstance = axios.create({
    baseURL: Url,
    withCredentials: true
})

export { axiosInstance }