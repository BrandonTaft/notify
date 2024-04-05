import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../reminderSlice";
import noteReducer from '../noteSlice';
import chatRoomReducer from '../chatRoomSlice'
import userReducer from '../userSlice';

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    notes: noteReducer,
    chatRooms: chatRoomReducer,
    user: userReducer
  }
})

