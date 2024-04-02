import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRooms: []
}

export const chatRoomSlice = createSlice({
    name: "chatRooms",
    initialState,
    reducers: {
        addChatRoom: {
            reducer(state, action) {
                state.chatRooms = action.payload
                console.log(state.chatRooms)
            }
        },
        updateChatRoom: (state, action) => {
            const { id, messages } = action.payload
            const existingChatRoom = state.find(chatRoom => chatRoom.id === id)
            if (existingChatRoom) {
                existingChatRoom.messages = messages
            }
        },
        addChatReaction: (state, action) => {
            const { room_id, id, reaction } = action.payload
            console.log("REACTION", action.payload)
            const room = state.chatRooms.find(room => room.id === room_id)
            const chatMessage = room.messages.find(message => message.id === id)
            if (chatMessage) {
              chatMessage.reactions[reaction]++
            }
          }
    }
})

export const { addChatRoom, updateChatRoom, addChatReaction } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
