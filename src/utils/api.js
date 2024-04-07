import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
const BASE_URL = "https://a15d-2600-6c5a-4a7f-463a-4d63-72d-f6a2-48ca.ngrok-free.app";

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
    return await fetch("https://a15d-2600-6c5a-4a7f-463a-4d63-72d-f6a2-48ca.ngrok-free.app/chatrooms")
      .then((res) => res.json())
      .catch((error) => console.log("Server did not respond"))
  }

  export const storeProfileImage = async (uri, userId) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `${userId}.${fileType}`,
        type: `image/${fileType}`
    });
    formData.append('userId', userId)
    return await fetch("https://a15d-2600-6c5a-4a7f-463a-4d63-72d-f6a2-48ca.ngrok-free.app/api/profile-image",
        {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log('response', response);
        })
        .catch((error) => {
            console.log('error', error);
        })
}
