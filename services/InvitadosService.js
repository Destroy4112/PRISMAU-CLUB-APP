import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.INVITADOS;

export const createInvitado = async (data, token) => {
    try {
        const res = await api.post(URL, data, {
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

export async function getCantidadInvitadosSocio(id, token) {
    try {
        const res = await api.get(URL + "/cantidad/" + id, {
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

export async function getEntradas(token) {
    try {
        const res = await api.get(URL + "/entradas", {
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

export const updateEntrada = async (id, token) => {
    try {
        const res = await api.put(URL + "/" + id, {}, {
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