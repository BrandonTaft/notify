import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import useAlarmSound from './useAlarmSound';
//import { Audio } from 'expo-av';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#b804d1de',
        });
    }
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }
    return token.data;
}

const usePushNotification = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState("")
    const [showAlarm, setShowAlarm] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(async(token) => {
            await AsyncStorage.setItem('token', token)
            setExpoPushToken(token)
        });
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification.request.content.body)
            setShowAlarm(true)
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    
    async function sendPushNotification(expoPushToken, notification) {
        const message = {
            to: expoPushToken,
            body: notification,
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    return { expoPushToken, notification, sendPushNotification, showAlarm, setShowAlarm };
};

export default usePushNotification