import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.CUOTAS_BAILE;
const URL2 = ENDPOINTS.PREFERENCIA;

export async function createPreferencia(data, token) {
    try {
        const res = await api.post(URL2 + "-cuota-baile", { id: data.cuotas_baile_id, valor: data.valor }, {
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

export async function getCuotasBaileUser(documento, token) {
    try {
        const res = await api.get(URL + "/" + documento, {
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