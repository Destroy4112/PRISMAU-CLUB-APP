import { useNavigation } from '@react-navigation/native';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { MenuSkeleton } from '../../../components/loading/MenuSkeleton';

const SECTION_TITLES = {
    portal: 'Portal Autogestión',
    bienestar: 'Bienestar',
    pagos: 'Pagos',
};

const toTitle = (key) => SECTION_TITLES[key] || key.charAt(0).toUpperCase() + key.slice(1);

function MenuGrid({ items = [] }) {

    const navigation = useNavigation();

    if (!items.length) return null;

    return (
        <View style={tw`flex-row justify-start flex-wrap`}>
            {items.map((menu, index) => {
                const bgClass = menu?.Color ? `bg-${menu.Color}` : 'bg-gray-500';
                const onPress = () => { if (menu?.Route) navigation.navigate(menu.Route); };

                return (
                    <TouchableOpacity key={`${menu?.id ?? index}-${menu?.Route ?? 'no-route'}`}
                        style={tw`items-center w-1/4 mb-4`} onPress={onPress} disabled={!menu?.Route}
                    >
                        <View style={[tw`w-16 h-16 rounded-lg justify-center items-center`, tw.style(bgClass)]}>
                            <FontAwesome5 name={menu?.Icon || 'th'} size={25} color="#ffffff" />
                        </View>
                        <Text style={[tw`mt-1 font-bold text-center`, { fontSize: Platform.OS === 'ios' ? 10 : 13 },]} numberOfLines={2}>
                            {menu?.Name ?? 'Sin nombre'}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function Menus({ menus = {}, loading = false }) {
    const groups = Object.entries(menus || {});
    const hasAny = groups.some(([, arr]) => Array.isArray(arr) && arr.length > 0);

    if (loading) {
        return (
            <>
                {Array.from({ length: 3 }).map((_, i) => (
                    <View key={i} style={tw`mb-6`}>
                        <MenuSkeleton />
                    </View>
                ))}
            </>
        );
    }

    if (!hasAny) return null;

    return (
        <View>
            {groups.map(([key, items]) => {
                if (!Array.isArray(items) || items.length === 0) return null;
                return (
                    <View key={key} style={tw`mb-1`}>
                        <Text style={tw`text-lg font-bold mb-3`}>{toTitle(key)}</Text>
                        <MenuGrid items={items} />
                    </View>
                );
            })}
        </View>
    );
}
