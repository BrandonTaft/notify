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
        addMessage: (state, action) => {
            const room = state.find(room => room.roomId === action.payload.roomId)
            if(room) {
                room.messages.push(action.payload)
            }
            console.log("messagesss", state)
            
          },
        addChatReaction: (state, action) => {
            const { roomId, messageId, reaction } = action.payload
            const room = state.find(room => room.roomId === roomId)
            const chatMessage = room.messages.find(message => message.messageId === messageId)
            if (chatMessage) {
              chatMessage.reactions[reaction]++
            }
          }
    }
})

export const { addChatRoom, addChatReaction, addMessage, addAllRoomsFromServer, addAllMessagesFromServer } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
