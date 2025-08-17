import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Bienvenida from '../../components/home/Bienvenida';
import CardsContadores from '../../components/home/CardsContadores';
import Logo from '../../components/home/Logo';
import MenuBienestar from '../../components/home/MenuBienestar';
import MenuPagos from '../../components/home/MenuPagos';
import MenuPortal from '../../components/home/MenuPortal';
import { useAuthContext } from '../../context/AuthContext';
import useCantidad from '../../hooks/useCantidad';
import useHome from '../../hooks/useHome';
import useUsuario from '../../hooks/useUsuario';
import ResumenContabilidad from '../../components/home/ResumenContabilidad';

export default function HomeScreen() {
  const { user, credenciales } = useAuthContext();
  const { contFamiliaresSocio, contInvitadosSocio, contReservasSocio, contSolicitudesSocio } = useCantidad();

  const { loadingBienestar, loadingPortal, loadingPagos, menuBienestar, menuPortal, menuPagos, loadingFinanzas, menuFinanzas } = useHome();

  const { contabilidad, loading } = useUsuario();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} rol={credenciales.Rol} />
      {
        (Number(credenciales.Rol) === 2 || Number(credenciales.Rol) === 3 || (Number(credenciales.Rol) === 5 && user.Parentesco === "Esposo (a)")) ?
          <>
            <CardsContadores
              familiares={contFamiliaresSocio}
              invitados={contInvitadosSocio}
              solicitudes={contSolicitudesSocio}
              reservas={contReservasSocio}
            />
            <View style={tw`p-4`}>
              {menuPortal.length > 0 &&
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-bold mb-3`}>Portal Autogestión</Text>
                  {
                    loadingPortal ?
                      <ActivityIndicator size="large" color="#0000ff" />
                      :
                      <MenuPortal menus={menuPortal} />
                  }
                </View>
              }
              {menuBienestar.length > 0 &&
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-bold mb-3`}>Bienestar Institucional</Text>
                  {
                    loadingBienestar ?
                      <ActivityIndicator size="large" color="#0000ff" />
                      :
                      <MenuBienestar menus={menuBienestar} />
                  }
                </View>
              }
              {menuPagos.length > 0 &&
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-bold mb-3`}>Pagos</Text>
                  {
                    loadingPagos ?
                      <ActivityIndicator size="large" color="#0000ff" />
                      :
                      <MenuPagos menus={menuPagos} />
                  }
                </View>
              }
            </View>
          </> :
          (Number(credenciales.Rol) === 7) ?
            <View style={tw`p-4`}>
              <ResumenContabilidad loading={loading} resumen={contabilidad} />
              {menuFinanzas.length > 0 &&
                <View style={tw`mb-4 mt-5`}>
                  <Text style={tw`text-lg font-bold mb-3`}>Finanzas</Text>
                  {
                    loadingFinanzas ?
                      <ActivityIndicator size="large" color="#0000ff" />
                      :
                      <MenuPortal menus={menuFinanzas} />
                  }
                </View>
              }
            </View> :
            <View style={tw`p-4 mt-10 mb-2`}>
              <Logo />
            </View>
      }
    </ScrollView>
  )
}