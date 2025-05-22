import { axiosInstance } from "../axios/axiosInstance"


export const getManagerTurf = () => {
    return axiosInstance.get("/manager/turf")
}

export const updateManagerTurf = (turfId, data) => {
    return axiosInstance.put(`/manager/updateturf/${turfId}`, data)
}

export const getManagerBookings = () => {
    return axiosInstance.get("/manager/bookings")
}

export const getManagerPayments = () => {
    return axiosInstance.get("/manager/payments")
}

