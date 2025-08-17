import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.ADHERENTES;

export const getAdherenteWithFamiliar = async (id, token) => {
    try {
        const res = await api.get(`${URL}/familiares/${id}`, {
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