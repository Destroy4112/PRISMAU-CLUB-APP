import { useAppQuery } from '../../../hooks/useStore';
import { getMenus } from './HomeService';

export default function apiQueryHome(rol, token) {

    const { data: menus, isLoading } = useAppQuery({
        queryKey: ['menus', rol, token],
        queryFn: () => getMenus(rol, token),
        enabled: (Number(rol) === 2 || Number(rol) === 3 || Number(rol) === 7) && !!token
    });

    return {
        menus,
        isLoading
    }
}