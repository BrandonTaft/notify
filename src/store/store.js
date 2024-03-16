import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "../features/reminder/reminderSlice";

export default configureStore({
  reducer: {
    reminder: reminderReducer
  }
})

