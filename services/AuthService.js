import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.LOGIN;
const URL_REGISTRO = ENDPOINTS.REGISTRO;

export const validarSesion = async (Documento, password) => {
    try {
        const res = await api.post(URL, { Documento, password });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

export const registrarse = async (data) => {
    try {
        const res = await api.post(URL_REGISTRO, data);
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
} 