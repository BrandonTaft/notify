import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../reminderSlice";
import chatRoomReducer from '../chatRoomSlice'
import userReducer from '../userSlice';

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    chatRooms: chatRoomReducer,
    user: userReducer
  }
})

