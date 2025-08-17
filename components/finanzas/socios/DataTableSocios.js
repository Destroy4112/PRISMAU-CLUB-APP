import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const ROLES_MAP = {
    2: 'Asociado',
    3: 'Adherente',
    4: 'Familiar',
    5: 'Empleado',
};

const ESTADO_MAP = {
    0: { label: 'Inactivo', badge: 'bg-gray-300 text-gray-800' },
    1: { label: 'Activo', badge: 'bg-green-200 text-green-900' },
    2: { label: 'Retirado', badge: 'bg-yellow-200 text-yellow-900' },
    3: { label: 'Mora', badge: 'bg-red-200 text-red-900' },
    4: { label: 'Ret. en mora', badge: 'bg-red-300 text-red-900' },
};

export default function DataTableSocios({ pagedSocios, page, setPage, totalPages, }) {

    const renderRol = (s) => ROLES_MAP[s?.rol] ?? '—';
    const renderEstado = (s) => {
        const e = ESTADO_MAP[s?.estado] ?? { label: '—', badge: 'bg-gray-200 text-gray-800' };
        return (
            <View style={tw`px-2 py-1 rounded ${e.badge}`}>
                <Text style={tw`text-xs`}>{e.label}</Text>
            </View>
        );
    };

    return (
        <ScrollView horizontal>
            <View style={tw`flex-1 bg-white border-2 border-gray-200 rounded-lg`}>
                <DataTable>
                    <DataTable.Header style={tw`bg-green-400 rounded-t-lg`}>
                        <DataTable.Title style={tw`w-64`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Nombre Completo</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-32`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Documento</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-40`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Mensualidades</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-40`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Cuotas Baile</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-28`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Rol</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-36`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}>Estado</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <ScrollView>
                        {pagedSocios.map((socio) => (
                            <DataTable.Row key={socio.id}>
                                <DataTable.Cell style={tw`w-64`}>{socio?.nombreCompleto ?? '—'}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-32`}>{socio?.documento ?? '—'}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-40`}>{socio?.mensualidades ?? '—'}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-40`}>{socio?.cuotas ?? '—'}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-28`}>{renderRol(socio)}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-36`}>{renderEstado(socio)}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </ScrollView>

                    <View style={tw`flex-row justify-between items-center p-2`}>
                        <DataTable.Pagination
                            page={page}
                            numberOfPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                            label={`Página ${page + 1} de ${totalPages}`}
                        />
                    </View>
                </DataTable>
            </View>
        </ScrollView>
    );
}
