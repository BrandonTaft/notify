import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = "https://497c-207-5-20-197.ngrok-free.app";
import * as SecureStore from 'expo-secure-store';

export const registerUser = async(user) => {
    return await fetch(BASE_URL + '/api/users/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user : user })
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}



export const logInUser = async(user) => {
    return await fetch(BASE_URL + '/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user : user })
    })
    .then(response => response.json()) 
    .catch((error) => console.log("An unexpected error has occurred :", error))
};

export const logOutUser = async(user) => {
    await AsyncStorage.removeItem("notify_user");
    await SecureStore.deleteItemAsync("secureToken")
    return await fetch(BASE_URL + '/api/users/logout', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user : user })
    })
    .then(response => response.json())
    .catch((error) => console.log("Server did not respond"))
};

export const deleteUser = async(user) => {
    let token = await SecureStore.getItemAsync("secureToken");
    await AsyncStorage.removeItem("notify_user"); 
    return await fetch(BASE_URL + '/api/users/delete', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user : user })
    })
    .then(response => response.json())
    .then(async (result) => {
        await SecureStore.deleteItemAsync("secureToken")
        if (!result.success) {
            setMessage("There was an error deleting the profile");
        }
    })
    .catch((error) => console.log("Server did not respond"))
};

export const updateUserProfile = async(userId, updatedProfileData) => {
    let token = await SecureStore.getItemAsync("secureToken");
    return await fetch(BASE_URL + '/api/users/update', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            userId : userId, 
            updatedProfileData: updatedProfileData
        })
    })
    .then(response => response.json())
    .catch((error) => console.log("Server "))
}

export const storeProfileImage = async (imageType, uri, userId) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append(imageType, {
        uri,
        name: `${userId}.${fileType}`,
        type: `image/${fileType}`,
    });
    formData.append('userId', userId)
    formData.append('image',uri)
    formData.append('imageType',imageType)
    return await fetch(BASE_URL + '/api/users/profile-image',
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
};

export const storeBannerImage = async (uri, userId) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `${userId}.${fileType}`,
        type: `image/${fileType}`
    });
    formData.append('userId', userId)
    formData.append('bannerImage',uri)
    return await fetch(BASE_URL + '/api/users/banner-image',
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



export const storeBackUpData = async (reminders) => {
    // await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
    // const deviceId = await AsyncStorage.getItem('deviceId');
    // return await fetch(BASE_URL + '/store', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         deviceId: deviceId,
    //         reminders: reminders
    //     })
    // })
    // .then(response => response.json())
    // .catch((error) => console.log("Server did not respond"))
};

export const fetchBackUpData = async () => {
    // const deviceId = await AsyncStorage.getItem('deviceId');
    // return await fetch(BASE_URL, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         deviceId: deviceId
    //     })
    // })
    // .then(response => response.json())
    // .catch((error) => console.log("Server did not respond"))
};

export const fetchGroups = async () => {
    return await fetch(BASE_URL + '/api/chatrooms')
      .then((res) => res.json())
      .catch((error) => console.log("Chat Server did not respond", error))
  };

  export const fetchOrgs = async () => {
    return await fetch(BASE_URL + '/api/org')
      .then((res) => res.json())
      .catch((error) => console.log("Unable to retrieve organizations", error))
  };

  export const createNewOrg = async(org) => {
    return await fetch(BASE_URL + '/api/org/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organization : org })
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}

  