import { axiosInstance } from "../axios/axiosInstance"


export const getManagerTurf = (userId) => {
    return axiosInstance.get(`/manager/turf?userId=${userId}`, { withCredentials: true })
}

export const updateManagerTurf = (turfId, data, userId) => {
    return axiosInstance.put(`/manager/updateturf/${turfId}?userId=${userId}`, data)
}

export const getManagerBookings = (userId) => {
    return axiosInstance.get(`/manager/bookings?userId=${userId}`, { withCredentials: true })
}

export const getManagerPayments = (userId) => {
    return axiosInstance.get(`/manager/payments?userId=${userId}`, { withCredentials: true })
}

