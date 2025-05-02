import { data } from "react-router-dom";


import { axiosInstance } from "../axios/axiosInstance"

// User Api service
export const listLocations = () => {
    return axiosInstance.get("/admin/GetAllLocations")
};

export const userSignup = (data) => {
    return axiosInstance.post("/user/register", data)
}

export const userLogin = (data, role) => {
    return axiosInstance.post(`/user/login?role=${role}`, data)
}

export const userLogout = () => {
    return axiosInstance.post("/user/logout")
}

export const bookTurf = () => {
    return axiosInstance.post("/user/booking")
}
export const makePaymentOnStripe = (paymentBody) => {
    return axiosInstance.post(`/payment/makepayment`, paymentBody)
}

export const getBookings = (userId) => {
    return axiosInstance.get(`/user/getBookings?userId=${userId}`)
}
