import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = " https://99ff-2600-6c5a-4a7f-463a-9552-e6ff-d168-230b.ngrok-free.app";

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

export const fetchGroups = async () => {
    return await fetch("https://99ff-2600-6c5a-4a7f-463a-9552-e6ff-d168-230b.ngrok-free.app/chatrooms")
      .then((res) => res.json())
      .catch((error) => console.log(error))
  }