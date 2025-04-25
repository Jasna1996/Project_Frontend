import { axiosInstance } from "../axios/axiosInstance"



// User Api service
export const listLocations = () => {
    return axiosInstance.get("/admin/GetAllLocations")
};
