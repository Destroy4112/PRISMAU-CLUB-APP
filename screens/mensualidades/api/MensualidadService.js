import { api } from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../models/endpoints/endpoints.model";

const URL = ENDPOINTS.MENSUALIDADES;
const URL2 = ENDPOINTS.PREFERENCIA;

export async function createPreferencia(data, token) {
    try {
        const res = await api.post(URL2 + "-mensualidad", { id: data.mensualidad_id, valor: data.valor }, {
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

export async function getMensualidadesUser(documento, token) {
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