import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    status: 'idle',
    error: null
  }

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
    const chats = await fetch("https://ab44-2600-6c5a-4a7f-463a-25d9-df0b-3d2c-aa64.ngrok-free.app/api")
    .then((res) => res.json())
    console.log("CHATSSSS", chats)
    return chats
})

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        createchatRoom: {
            reducer(state, action) {
                state.push(action.payload)
            },
        },
    }
})

export const { createChatRoom } = chatSlice.actions;

export default chatSlice.reducer; 