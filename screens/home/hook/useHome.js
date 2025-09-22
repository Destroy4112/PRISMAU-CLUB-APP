import { useAuthContext } from '../../../context/AuthContext';
import apiQueryHome from '../api/apiQueryHome';

export default function useHome() {

    const { token, credenciales, socio, user } = useAuthContext();

    const rol = Number(credenciales?.Rol);
    const esFamiliarConSocio = rol === 5 && socio && (Number(socio.Rol) === 2 || Number(socio.Rol) === 3);
    const rolConsulta = esFamiliarConSocio ? Number(socio.Rol) : rol;

    const { isLoading, menus } = apiQueryHome(rolConsulta, token);

    return {
        isLoading,
        menus,
        credenciales,
        user,
    };
}