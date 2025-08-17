import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.MENUS_ROL;

export const getMenusPortal = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/portal', {
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

export const getMenusBienestar = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/bienestar', {
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

export const getMenusPagos = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/pagos', {
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

export const getMenusFinanzas = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/finanzas', {
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

export const getMenusPerfil = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/perfil', {
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