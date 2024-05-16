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
            const { roomId, messageId, reaction } = action.payload
            console.log("REACTION", action.payload)
            const room = state.find(room => room.roomId === roomId)
            const chatMessage = room.messages.find(message => message.messageId === messageId)
            if (chatMessage) {
              chatMessage.reactions[reaction]++
            }
          }
    }
})

export const { addChatRoom, addMessage, addChatReaction, addAllRoomsFromServer } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
