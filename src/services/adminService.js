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

export const GetAllManagers = () => {
    return axiosInstance.get("/admin/GetAllManagers")
}

export const addManager = (data) => {
    return axiosInstance.post("/admin/AddManager", data)
}

export const editManager = (id, data) => {
    return axiosInstance.put(`/admin/EditManager?id=${id}`, data)
}

export const deleteManager = (id) => {
    return axiosInstance.delete(`/admin/DeleteManager/${id}`)
}

export const getAllBookings = () => {
    return axiosInstance.get("/admin/GetAllBookings")
}

export const getAllUsers = () => {
    return axiosInstance.get("/admin/GetAllUsers");
}
export const addManagerUser = (data) => {
    return axiosInstance.post('/admin/AddManagerUser', data);
}