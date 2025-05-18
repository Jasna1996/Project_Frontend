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
    if (role) {
        return axiosInstance.post(`/user/login?role=${role}`, data)
    }
    return axiosInstance.post(`/user/login?`, data)
}

export const userLogout = () => {
    return axiosInstance.post("/user/logout")
}

export const bookTurf = (bookingData) => {
    return axiosInstance.post("/user/booking", bookingData)
}
export const makePaymentOnStripe = (paymentBody) => {
    return axiosInstance.post(`/payment/makepayment`, paymentBody)
}

export const getBookings = (userId) => {
    return axiosInstance.get(`/user/getBookings?userId=${userId}`,
        { withCredentials: true }
    )
}
