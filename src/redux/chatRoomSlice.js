import { createSlice, nanoid, createAsyncThunk, useSelector } from "@reduxjs/toolkit";

const initialState = {
    chatRooms: [],
    status: 'idle',
    error: null
}

export const chatRoomSlice = createSlice({
    name: "chatRooms",
    initialState,
    reducers: {
        addChatRoom: {
            reducer(state, action) {
                state.chatRooms = action.payload
            }
        },
        updateChatRoom: (state, action) => {
            const { id, messages } = action.payload
            const existingChatRoom = state.find(chatRoom => chatRoom.id === id)
            if (existingChatRoom) {
                existingChatRoom.messages = messages
            }
        },
    }
})

export const { addChatRoom, updateChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
