import { axiosInstance } from "../axios/axiosInstance"



export const bookTurf = () => {
    return axiosInstance.get('')
}