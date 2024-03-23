import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../redux/reminderSlice";
import noteReducer from '../redux/noteSlice';
import chatReducer from '../redux/chatSlice'

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    notes: noteReducer,
    chats: chatReducer
  }
})

