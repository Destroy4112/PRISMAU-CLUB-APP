import { api } from "../config/axiosConfig";
import { ENDPOINTS } from "../models/endpoints/endpoints.model";

const URL = ENDPOINTS.NOTICIAS;

export const getNoticias = async (token) => {
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
};