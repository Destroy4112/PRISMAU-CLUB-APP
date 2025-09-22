import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const formatCOP = (v) => {
    const n = Number(v) || 0;
    try {
        return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    } catch {
        return `COP ${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
};

export default function ResumenContabilidad({ loading, resumen }) {
    if (loading) {
        return (
            <View style={tw`flex-1 items-center justify-center py-10`}>
                <ActivityIndicator size="large" color="#098221" />
                <Text style={tw`mt-3 text-gray-600`}>Cargando resumen…</Text>
            </View>
        );
    }

    const ingresos = resumen?.ingresos ?? {};
    const pendientes = resumen?.pendientes ?? {};
    const pendMens = pendientes?.mensualidades ?? { registros: 0, monto: 0 };
    const pendCuot = pendientes?.cuotas_baile ?? { registros: 0, monto: 0 };

    return (
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`py-4`}>
            <View style={tw`mb-4 flex-row items-center justify-between`}>
                <Text style={tw`text-lg font-bold`}>Resumen contable</Text>
            </View>

            {/* INGRESOS */}
            <View style={tw`bg-white rounded-lg border border-gray-200 p-4 mb-4`}>
                <Text style={tw`uppercase text-gray-500 text-xs mb-2`}>Ingresos</Text>

                <View style={tw`flex-row justify-between py-2`}>
                    <Text style={tw`text-gray-700`}>Mensualidades</Text>
                    <Text style={tw`font-semibold`}>{formatCOP(ingresos?.mensualidades)}</Text>
                </View>

                <View style={tw`h-px bg-gray-200`} />

                <View style={tw`flex-row justify-between py-2`}>
                    <Text style={tw`text-gray-700`}>Cuotas de baile</Text>
                    <Text style={tw`font-semibold`}>{formatCOP(ingresos?.cuotas_baile)}</Text>
                </View>

                <View style={tw`h-px bg-gray-200`} />

                <View style={tw`flex-row justify-between py-2`}>
                    <Text style={tw`text-gray-900 font-bold`}>Total</Text>
                    <Text style={tw`text-green-700 font-extrabold`}>{formatCOP(ingresos?.total)}</Text>
                </View>
            </View>

            {/* PENDIENTES */}
            <View style={tw`bg-white rounded-lg border border-gray-200 p-4`}>
                <Text style={tw`uppercase text-gray-500 text-xs mb-3`}>Pendientes</Text>

                {/* Mensualidades */}
                <View style={tw`mb-4`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`font-semibold`}>Mensualidades</Text>
                        <Text style={tw`text-gray-700`}>{pendMens.registros} registro(s)</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-between mt-2`}>
                        <Text style={tw`text-gray-700`}>Monto pendiente</Text>
                        <Text style={tw`font-semibold`}>{formatCOP(pendMens.monto)}</Text>
                    </View>
                </View>

                <View style={tw`h-px bg-gray-200 mb-4`} />

                {/* Cuotas de Baile */}
                <View>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`font-semibold`}>Cuotas de baile</Text>
                        <Text style={tw`text-gray-700`}>{pendCuot.registros} registro(s)</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-between mt-2`}>
                        <Text style={tw`text-gray-700`}>Monto pendiente</Text>
                        <Text style={tw`font-semibold`}>{formatCOP(pendCuot.monto)}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}