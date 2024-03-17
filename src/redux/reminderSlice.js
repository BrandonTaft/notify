import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name: "reminders",
    initialState: [],
    reducers: {
        createReminder(state, action) {
            state.push(action.payload)
          }
    }
});

export const { createReminder } = reminderSlice.actions;

export default reminderSlice.reducer