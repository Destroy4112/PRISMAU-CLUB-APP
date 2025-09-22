import { useAppMutation, useAppQuery, useAppQueryClient } from '../../../hooks/useStore';
import { createPreferencia, getMensualidadesUser } from './MensualidadService';

export default function apiQueryMensualidad() {

    const queryClient = useAppQueryClient();

    const { mutate: createPreferenciaMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createPreferencia,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['mensualidades'] }); }
    });

    const { data: mensualidades, isLoading } = useAppQuery({
        queryKey: ['mensualidades', documento, token],
        queryFn: () => getMensualidadesUser(documento, token),
        enabled: !!documento && !!token
    });

    return {
        mensualidades,
        isLoading,
        isCreating,
        createPreferenciaMutation
    }
}
