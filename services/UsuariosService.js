import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.USUARIO;

export const getUsersActivos = async (token) => {
    try {
        const res = await api.get(URL, {
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

export const getSocios = async (token) => {
    try {
        const res = await api.get(URL + "saldos", {
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

export const getContabilidad = async (token) => {
    try {
        const res = await api.get(URL + "contabilidad", {
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

export const getUsuario = async (documento, token) => {
    try {
        const res = await api.get(URL + documento, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("Error al obtener el usuario", error.message);
        throw error.message;
    }
}

export const changePassword = async (id, password, token) => {
    try {
        const res = await api.put(URL + id, { password }, {
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

export const deleteAccount = async (id, token) => {
    try {
        const res = await api.delete(URL + id, {
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