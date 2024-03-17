import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../redux/reminderSlice";
import noteReducer from '../redux/noteSlice';

export default configureStore({
  reducer: {
    reminders: reminderReducer,
    notes: noteReducer
  }
})

