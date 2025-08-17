import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { api } from '../config/axiosConfig';
import { ENDPOINTS } from '../models/endpoints/endpoints.model';

const URL = ENDPOINTS.NOTIFICACIONES;

export async function registrarTokenEnServidor(expoPushToken, token) {
    try {
        const response = await api.post(URL, { expo_token: expoPushToken }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error de red al suscribir el token', err);
    }
}

export async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
        Alert.alert('Solo funciona en un dispositivo físico');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Permiso de notificaciones no concedido');
        return;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
        });
    }

    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({ projectId });

    return expoPushToken;
}