import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL_SEND_CODE = ENDPOINTS.RESET;
const URL_VERIFY = ENDPOINTS.VERIFY;
const URL_CHANGE = ENDPOINTS.CHANGE;

export async function sendCode(documento) {
    try {
        const res = await api.post(URL_SEND_CODE, { Documento: documento });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function validateCode(codigo) {
    try {
        const res = await api.post(URL_VERIFY, { code: codigo });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function changePassword(codigo, clave) {
    try {
        const res = await api.post(URL_CHANGE, { code: codigo, new_password: clave });
        return res.data;
    } catch (error) {
        throw error;
    }
};

