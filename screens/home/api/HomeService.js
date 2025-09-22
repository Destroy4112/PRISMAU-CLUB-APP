import { api } from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../models/endpoints/endpoints.model";

const URL = ENDPOINTS.MENUS_ROL;

export const getMenus = async (id, token) => {
    try {
        const res = await api.get(URL + id + '/tipos', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log("Get menus error: " + error.message);
        throw error.message;
    }
}