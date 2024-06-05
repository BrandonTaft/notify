import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = "https://bd5f-2600-6c5a-4a7f-463a-850a-7438-52a3-1b88.ngrok-free.app";
import * as SecureStore from 'expo-secure-store';

export const fetchAllUsers = async () => {
    let token = await SecureStore.getItemAsync("secureToken");
    return await fetch(BASE_URL + '/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
      .catch((error) => console.log("Server did not respond", error))
  };

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

export const refreshUser = async(userId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    return await fetch(BASE_URL + '/api/users/refresh', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId : userId })
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
};


export const fetchReminders = async (userId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    return await fetch(BASE_URL + '/api/reminders', {
    method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: JSON.parse(user)._id})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
};

export const addReminder = async(reminder) => {
    console.log("REMINDER", reminder)
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/reminders/add-reminder', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, reminder:reminder})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
};

export const updateReminderApi = async(reminder) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/reminders/update', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, updatedReminder:reminder})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}


export const deleteReminderApi = async(reminderId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/reminders/delete', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, reminderId:reminderId})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}

export const clearReminder = async(reminderId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/reminders/clear', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, reminderId:reminderId})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
};

export const completeReminderApi = async(reminderId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/reminders/complete', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, reminderId:reminderId})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}

export const updateNoteApi = async(note) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/users/edit-note', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, updatedNote:note})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
};

export const deleteNoteApi = async(noteId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    let userId = JSON.parse(user)._id; 
    
    return await fetch(BASE_URL + '/api/users/delete-note', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, noteId: noteId})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
}

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
};

export const fetchDirectMessages = async (userId) => {
    let token = await SecureStore.getItemAsync("secureToken");
    let user = await AsyncStorage.getItem("notify_user")
    return await fetch(BASE_URL + '/api/private-chatrooms', {
    method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: JSON.parse(user)._id})
    })
    .then(response => response.json())
    .catch((error) => console.log("An unexpected error has occurred :", error))
};
