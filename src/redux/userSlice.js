import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL,updateUserPrivateRoom } from "../utils/api";


export const postNoteToDb = createAsyncThunk('posts/postNoteToDb', async (note) => {
  console.log("POSTNOTETOCB", note)
  let token = await SecureStore.getItemAsync("secureToken");

  let user = await AsyncStorage.getItem("notify_user")
  const apiResponse = await fetch(BASE_URL + '/api/users/add-note', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: JSON.parse(user)._id, note: { body: note } })
  });
  const response = await apiResponse.json();
  console.log("USERSlice NOTES", response)

  return response

})


export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    notes: [],
    privateRooms: []
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
          notes,
          privateRooms
        } = notifyUser
        return {
          payload: {
            _id: _id,
            userName,
            organization,
            profileImage,
            bannerImage,
            isLoggedIn: isLoggedIn,
            expoPushToken: expoPushToken,
            notes: notes,
            privateRooms: privateRooms
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
      const { imageType, image } = action.payload;
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
    updateNote: (state, action) => {
      const { noteId, content } = action.payload
      console.log(noteId, content)
      const existingNote = state.notes.find(note => note._id === noteId)
      if (existingNote) {
        existingNote.body = content
      }
    },
    deleteNote: (state, action) => {
      const existingNote = state.notes.find(note => note._id === action.payload)
      if (existingNote) {
        existingNote.isDeleted = true
      }
    },
    addPrivateMessage: (state, action) => {
      let existingRoom;
      if (!action.payload.fromSelf) {
        existingRoom = state.privateRooms.find(room => room.recipientId === action.payload.senderId)
        if (existingRoom) {
          existingRoom.messages.push(action.payload)
          state.privateRooms.unshift(state.privateRooms.splice(state.privateRooms.findIndex(existingRoom), 1)[0])
        } else {
          state.privateRooms.unshift({
            recipientId: action.payload.senderId, recipientName: action.payload.sender, messages: [action.payload]
          })
        }
        updateUserPrivateRoom(state._id, action.payload.senderId, action.payload.sender, action.payload)
      } else if (action.payload.fromSelf) {
        existingRoom = state.privateRooms.find(room => room.recipientId === action.payload.receiverId)
        if (existingRoom) {
          existingRoom.messages.push(action.payload)
          state.privateRooms.unshift(state.privateRooms.splice(state.privateRooms.findIndex(existingRoom), 1)[0])
        } else {
          state.privateRooms.unshift({
            recipientId: action.payload.receiverId, recipientName: action.payload.receiver, messages: [action.payload]
          })
        }
        updateUserPrivateRoom( state._id, action.payload.receiverId, action.payload.receiver, action.payload)
      }
      
      console.log("usersliceeeee private roooms",state.userName, state.privateRooms)
    },
    logOut: (state, action) => {
      return {
        isLoggedIn: false,
        notes: [],
        privateRooms: []
      }
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
          state.notes = action.payload.notes
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

export const { createUser, createNote, deleteNote, updateNote, logOut, editUserProfileImage, editUserBanner, editUserCredentials, addPrivateMessage } = userSlice.actions;

export default userSlice.reducer; 