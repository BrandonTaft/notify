import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../reminderSlice";
import chatRoomReducer from '../chatRoomSlice'
import userReducer from '../userSlice';
import allUsersReducer from '../allUsersSlice';

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    chatRooms: chatRoomReducer,
    user: userReducer,
    allUsers: allUsersReducer
  }
})

