import { data } from "react-router-dom";


import { axiosInstance } from "../axios/axiosInstance"

// User Api service
export const listLocations = () => {
    return axiosInstance.get("/admin/GetAllLocations")
};

export const userSignup = (data) => {
    return axiosInstance.post("/user/register", data)
}

export const userLogin = (data) => {
    return axiosInstance.post("/user/login", data)
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

