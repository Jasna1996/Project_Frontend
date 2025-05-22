import { axiosInstance } from "../axios/axiosInstance"


export const changePassword = (data, role) => {
    return axiosInstance.post(`/${role}/changepassword`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(`${role}-token`)}`,
        },
    });
}