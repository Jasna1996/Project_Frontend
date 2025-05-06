import { axiosInstance } from "../axios/axiosInstance"


export const listTurfsByLocation = (locationId) => {
    return axiosInstance.get(`/turf/getTurfsByLocation?location_Id=${locationId}`);
};

export const addTurf = (data) => {
    return axiosInstance.post('/turf/createTurf', data);
}

export const getAllTurfs = () => {
    return axiosInstance.get('/turf/getAllTurf')
}

export const editTurf = (id, formData) => {
    return axiosInstance.post(`/turf/editTurf/${id}`, formData)
}

export const deleteTurf = (id) => {
    return axiosInstance.delete(`/turf/deleteTurf/${id}`)
}