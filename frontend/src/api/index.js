import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000"
});

export const createGateway = payload => api.post("/gateway/create", payload);
export const listGateway = () => api.get("/gateway/list");

export const getGateway = id => api.get(`/gateway/details/${id}`);

export const deleteGateway = id => api.get(`/gateway/delete/${id}`);

export const getDevice = id => api.get(`/device/details/${id}`);

export const removeDevice = id => api.get(`/device/removeFromGateway/${id}`);

export const addDeviceToGateway = (id, payload) => api.post(`/device/addToGateway/${id}`, payload);

export const createDevice = payload => api.post(`/device/create`, payload);

export const listDevice = () => api.get("/device/list");

const apis = {
    createGateway,

    listGateway,

    getGateway,

    deleteGateway,

    removeDevice,

    addDeviceToGateway,

    createDevice,

    listDevice,

    getDevice
};

export default apis;