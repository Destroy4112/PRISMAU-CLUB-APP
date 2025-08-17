import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { registerForPushNotificationsAsync, registrarTokenEnServidor } from '../services/NotificationService';

export default function usePushNotifications() {
    const { token: authToken } = useAuthContext();
    const [expoToken, setExpoToken] = useState(null);

    useEffect(() => {
        async function getToken() {
            const token = await registerForPushNotificationsAsync();
            if (token) setExpoToken(token);
        }
        getToken();
        const subscription = Notifications.addNotificationReceivedListener(() => { });
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (expoToken && authToken) {
            registrarTokenEnServidor(expoToken, authToken);
        }
    }, [expoToken, authToken]);
}
