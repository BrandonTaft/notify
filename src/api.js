import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "https://57bb-2600-6c5a-4a7f-463a-b548-d98d-5c05-b498.ngrok-free.app";

export const storeBackUpData = async (reminders) => {
    await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
    const deviceId = await AsyncStorage.getItem('deviceId');
    return await fetch(BASE_URL + '/store', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deviceId: deviceId,
            reminders: reminders
        })
    })
    .then(response => response.json())
    .catch((error) => console.log("Server did not respond"))
};

export const fetchBackUpData = async () => {
    const deviceId = await AsyncStorage.getItem('deviceId');
    return await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deviceId: deviceId
        })
    })
    .then(response => response.json())
    .catch((error) => console.log("Server did not respond"))
};

// export const handleChat = () => {

// }