import { axiosInstance } from "../axios/axiosInstance"


export const listTurfsByLocation = (locationId) => {
    return axiosInstance.get(`/turf/getTurfsByLocation?location_Id=${locationId}`);
};