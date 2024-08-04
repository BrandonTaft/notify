import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../utils/api";

export const fetchChatRooms = createAsyncThunk('chatRooms/fetchAllRooms',
    async () => {
        const response = await fetch(BASE_URL + '/api/chatrooms');
        const json = await response.json();
        return json.chatRooms
    },
)

export const chatRoomSlice = createSlice({
    name: "chatRooms",
    initialState: {
        rooms: [],
        loading: false,
        error: ""
    },
    reducers: {
        // addAllRoomsFromServer: {
        //     reducer(state, action) {
        //         return action.payload
        //     }
        // },
        addChatRooms: (state, action) => {
                console.log("ADDED ROOM")
                return {
                    loading: false,
                    rooms: action.payload
                }
        },
        addMessage: (state, action) => {
            const room = state.rooms.find(room => room.roomId === action.payload.roomId)
            if (room) {
                room.messages.push(action.payload)
            }
            console.log("messagesss", state)

        },
        addChatReaction: (state, action) => {
            const { roomId, messageId, reaction } = action.payload
            const room = state.rooms.find(room => room.roomId === roomId)
            const chatMessage = room.messages.find(message => message.messageId === messageId)
            if (chatMessage) {
                chatMessage.reactions[reaction]++
            }
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchChatRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChatRooms.fulfilled, (state, action) => {
                return {
                    loading: false,
                    rooms: action.payload
                }

            })
            .addCase(fetchChatRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export const { addChatRooms, addChatReaction, addMessage, addAllRoomsFromServer, addAllMessagesFromServer } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
