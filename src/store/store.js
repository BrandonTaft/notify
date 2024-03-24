import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../redux/reminderSlice";
import noteReducer from '../redux/noteSlice';
import chatRoomReducer from '../redux/chatRoomSlice'
import userReducer from '../redux/userSlice';

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    notes: noteReducer,
    chatRooms: chatRoomReducer,
    user: userReducer
  }
})

