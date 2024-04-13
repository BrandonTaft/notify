import { createSlice } from "@reduxjs/toolkit";

export const chatRoomSlice = createSlice({
    name: "chatRooms",
    initialState:[],
    reducers: {
        addAllRoomsFromServer: {
            reducer(state, action) {
                return action.payload
            }
        },
        addChatRoom: {
            reducer(state, action) {
                console.log("CHATSLICE", action.payload)
                return action.payload
            }
        },
        // addMessage: (state, action) => {
        //     console.log("ADDMESSAGES", action.payload)
        //     const { id, messages } = action.payload
        //     const existingChatRoom = state.find(chatRoom => chatRoom.id === id)
        //     console.log("EXISTING ROOM", existingChatRoom)
        //     if (existingChatRoom) {
        //         existingChatRoom.messages = messages
        //     }
        // },
        addChatReaction: (state, action) => {
            const { room_id, id, reaction } = action.payload
            console.log("REACTION", action.payload)
            const room = state.find(room => room.id === room_id)
            const chatMessage = room.messages.find(message => message.id === id)
            if (chatMessage) {
              chatMessage.reactions[reaction]++
            }
          }
    }
})

export const { addChatRoom, addMessage, addChatReaction, addAllRoomsFromServer } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
