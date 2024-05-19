import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


export const postNoteToDb = createAsyncThunk('posts/postNoteToDb', async (note) => {
console.log("POSTNOTETOCB", note)
  let token = await SecureStore.getItemAsync("secureToken");

  let user = await AsyncStorage.getItem("notify_user")
  const apiResponse = await fetch('https://d8a9-75-131-25-248.ngrok-free.app' + '/api/users/add-note', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: JSON.parse(user)._id, note:{body:note} })
  });
  const response = await apiResponse.json();
  console.log("USERSlice NOTES", response)

  return response

})


export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    notes: []
  },
  reducers: {
    createUser: {
      reducer(state, action) {
        return action.payload
      },
      prepare(notifyUser) {
        const { 
          _id, 
          userName, 
          organization, 
          profileImage, 
          bannerImage, 
          isLoggedIn, 
          expoPushToken, 
          notes 
        } = notifyUser
        return {
          payload: {
            userId: _id,
            userName,
            organization,
            profileImage,
            bannerImage,
            isLoggedIn: isLoggedIn,
            expoPushToken: expoPushToken,
            notes: notes
          }
        }
      }
    },
    editUserCredentials: (state, action) => {
      return {
        ...state,
        userName: action.payload.userName,
        organization: action.payload.organization
      }
    },
    editUserProfileImage: (state, action) => {
      const {imageType, image} = action.payload;
      return {
        ...state,
        [imageType]: image
      }
    },
    editUserBanner: (state, action) => {
      return {
        ...state,
        bannerImage: action.payload
      }
    },
    createNote: {
      reducer(state, action) {
        state.notes.push(action.payload)
      },
      prepare(content) {
        return {
            payload: {
                id: nanoid(),
                content,
                timeStamp: new Date().toISOString(),
                isChecked: false,
                isCompleted: false,
                isDeleted: false,
            }
        }
    }
    },
    logOut: (state, action) => {
      return { isLoggedIn: false }
    },
  },
  extraReducers: (builder) => {
    builder
          .addCase(postNoteToDb.pending, (state) => {
            state.loading = true;
          })
        .addCase(postNoteToDb.fulfilled, (state, action) => {
            state.loading = false;
            
            if (action.payload.success) {
                console.log("STATE",action.payload)
                state.notes = action.payload.notes
                // return action.payload.reminders
            } else {
                return state
            }
        })
      .addCase(postNoteToDb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
},
});

export const { createUser, createNote, logOut, editUserProfileImage, editUserBanner, editUserCredentials } = userSlice.actions;

export default userSlice.reducer; 