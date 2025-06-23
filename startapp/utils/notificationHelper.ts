import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


export async function registerForPushNotificationsAsync(): Promise<boolean> {
    if (!Device.isDevice) {
        console.log("Você precisa usar um celular físico para receber notificações")
        return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if ( existingStatus !== 'granted' ) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === 'granted'
}

