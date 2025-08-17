import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL_FAMILIAR = ENDPOINTS.FAMILIARES;

export const getCantidadFamiliaresSocio = async (id, rol, token) => {
    try {
        const res = await api.get(URL_FAMILIAR + "/cantidad/" + id + "/" + rol, {
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

export const getFamiliaresSocio = async (id, rol, token) => {
    try {
        const res = await api.get(URL_FAMILIAR + "/" + id + "/" + rol, {
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

export const getFamiliaresPareja = async (id, token) => {
    try {
        const res = await api.get(URL_FAMILIAR + "/pareja/" + id, {
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