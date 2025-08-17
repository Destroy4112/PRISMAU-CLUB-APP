import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DataTableSocios from '../../../components/finanzas/socios/DataTableSocios';
import useUsuario from '../../../hooks/useUsuario';
import BuscadorEntrada from '../../../components/entradas/BuscadorEntrada';

export default function SociosScreen() {

    const { pagedSocios, loadingSocios, busqueda, page, totalPages, handleBusqueda, setPage } = useUsuario();

    return (
        <View style={tw`flex-1 p-5 bg-gray-50`}>
            <Text style={tw`font-bold text-lg`}>Control de entradas</Text>
            <BuscadorEntrada busqueda={busqueda} handleBusqueda={handleBusqueda} />
            {loadingSocios ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <ActivityIndicator size="large" color="#098221" />
                </View>
            ) :
                <ScrollView style={tw`flex-1`}>
                    <DataTableSocios
                        pagedSocios={pagedSocios}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </ScrollView>
            }
        </View>
    )
}