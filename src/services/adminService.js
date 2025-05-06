import { axiosInstance } from "../axios/axiosInstance";

export const addLocations = (data) => {
    return axiosInstance.post("/admin/AddLocation", data)
}

export const editLocation = (id, data) => {
    return axiosInstance.put(`/admin/EditLocation/${id}`, data)
}

export const deleteLocation = (id) => {
    return axiosInstance.delete(`/admin/DeleteLocation/${id}`)
}

export const getAllManagers = () => {
    return axiosInstance.get("/admin/GetAllManagers")
}

export const editManager = (id) => {
    return axiosInstance.put(`/admin/EditManager?id=${id}`)
}

export const deleteManager = () => {
    return axiosInstance.delete(`/admin/DeleteManager?id=${id}`)
}

export const getAllBookings = () => {
    return axiosInstance.get("/admin/GetAllBookings")
}
export const getAllPayments = () => {
    return axiosInstance.get("/admin/GetAllPayments")
}