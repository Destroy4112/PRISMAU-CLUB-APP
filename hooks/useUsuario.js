import { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { changePassword, deleteAccount, getContabilidad, getSocios } from '../services/UsuariosService';
import { alertSuccess, alertWarning } from '../utilities/toast/Toast';

function useUsuario() {

    const itemsPerPage = 30;
    const { token, credenciales } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [delet, setDelet] = useState(false);
    const [loadingSocios, setLoadingSocios] = useState(false);
    const [socios, setSocios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(0);
    const [contabilidad, setContabilidad] = useState({});

    /*=========== Consultar socios ==============================*/

    const consultarSocios = async () => {
        setLoadingSocios(true);
        try {
            const data = await getSocios(token);
            setSocios(data);
        } catch (e) {
            console.log("Socios", e);
        } finally {
            setLoadingSocios(false);
        }

    };

    useEffect(() => {
        consultarSocios();
    }, []);

    const normalizeText = (text = '') => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const listadoFiltrado = useMemo(() => {
        if (!busqueda) return socios;

        const q = normalizeText(busqueda);
        const palabras = q.split(/\s+/).filter(Boolean);

        return socios.filter((s) => {
            const nombreCompleto = s?.nombreCompleto;
            const target =
                `${normalizeText(nombreCompleto)} ` +
                `${normalizeText(s?.documento ?? '')}`;
            return palabras.every((p) => target.includes(p));
        });
    }, [socios, busqueda]);

    const totalPages = Math.max(1, Math.ceil(listadoFiltrado.length / itemsPerPage));

    const pagedSocios = useMemo(() => {
        const startIndex = page * itemsPerPage;
        return listadoFiltrado.slice(startIndex, startIndex + itemsPerPage);
    }, [listadoFiltrado, page, itemsPerPage]);

    const refresh = consultarSocios;

    const handleBusqueda = (text) => {
        setBusqueda(text);
        setPage(0);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const toggleModalDelete = () => {
        setModalDeleteVisible(!modalDeleteVisible);
        setDelet(false);
    }

    const handleChange = (value) => {
        setPassword(value);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await changePassword(credenciales.id, password, token);
            setLoading(false);
            if (data.message == "hecho") {
                toggleModal();
                setPassword('');
                alertSuccess("Contraseña actualizada");
            }
        } catch (error) {
            setLoading(false);
            alertWarning(error.message);
        }
    }

    const eliminarCuenta = async () => {
        try {
            setLoading(true);
            const data = await deleteAccount(credenciales.id, token);
            setLoading(false);
            if (data.message == "hecho") {
                setDelet(true);
            }
        } catch (error) {
            setLoading(false);
            alertWarning("Error al eliminar la cuenta", error.message);
        }
    }

    /*=========== Consultar finanzas ==============================*/

    const consultarFinanzas = async () => {
        setLoading(true);
        try {
            const data = await getContabilidad(token);
            setContabilidad(data.resumen);
        } catch (e) {
            alertWarning("Consultar finanzas", e);
            console.log("Error al consultar las finanzas", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Number(credenciales.Rol) === 7) {
            consultarFinanzas();
        }
    }, [credenciales.Rol]);

    return {
        modalVisible,
        password,
        loading,
        modalDeleteVisible,
        delet,
        pagedSocios,
        loadingSocios,
        busqueda,
        page,
        totalPages,
        setPage,
        contabilidad,
        refresh,
        handleBusqueda,
        toggleModalDelete,
        toggleModal,
        handleChange,
        handleSubmit,
        eliminarCuenta
    }
}

export default useUsuario