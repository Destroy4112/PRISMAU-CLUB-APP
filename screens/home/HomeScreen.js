import { ScrollView, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import useCantidad from '../../hooks/useCantidad';
import useUsuario from '../../hooks/useUsuario';
import Bienvenida from './components/Bienvenida';
import CardsContadores from './components/CardsContadores';
import Logo from './components/Logo';
import Menus from './components/Menus';
import ResumenContabilidad from './components/ResumenContabilidad';
import useHome from './hook/useHome';

export default function HomeScreen() {

  const { user, credenciales, isLoading, menus } = useHome();
  const { contFamiliaresSocio, contInvitadosSocio, contReservasSocio, contSolicitudesSocio } = useCantidad();
  const { contabilidad, loading } = useUsuario();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} rol={credenciales.Rol} />
      {(Number(credenciales.Rol) === 2 || Number(credenciales.Rol) === 3 || (Number(credenciales.Rol) === 5 && user.Parentesco === "Esposo (a)")) ?
        <>
          <CardsContadores
            familiares={contFamiliaresSocio}
            invitados={contInvitadosSocio}
            solicitudes={contSolicitudesSocio}
            reservas={contReservasSocio}
          />
          <View style={tw`p-4`}>
            <Menus menus={menus} loading={isLoading} />
          </View>
        </> : (Number(credenciales.Rol) === 7) ?
          <>
            <View style={tw`p-4`}>
              <ResumenContabilidad loading={loading} resumen={contabilidad} />
              <Menus menus={menus} loading={isLoading} />
            </View>
          </> :
          <View style={tw`p-4 mt-10 mb-2`}>
            <Logo />
          </View>
      }
    </ScrollView>
  )
}