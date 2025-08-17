import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.ENCUESTAS;
const URL2 = ENDPOINTS.RESPUESTAS_USUARIOS;

export const getEncuestas = async (token, id) => {
    try {
        const res = await api.get(URL + "/disponibles/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

export const getEncuesta = async (token, id) => {
    try {
        const res = await api.get(URL + "/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

export const responderEncuesta = async (token, data) => {
    try {
        const res = await api.post(URL2, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}