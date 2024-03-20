import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name: "reminders",
    initialState: [],
    reducers: {
        createReminder: (state, action) => {
            state.push(action.payload)
        },
        updateReminder: (state, action) => {
            const { _id, title, selectedDate } = action.payload
            const existingPost = state.find(post => post._id === _id)
            if (existingPost) {
                existingPost.title = title
                existingPost.selectedDate = selectedDate
            }
        },
        completeReminder: (state, action) => {
            const existingPost = state.find(post => post._id === action.payload)
            if (existingPost) {
                existingPost.isCompleted = true
            }
        },
        deleteReminder: (state, action) => {
            const existingPost = state.find(post => post._id === action.payload)
            if (existingPost) {
                existingPost.isDeleted = true
            }
        }
    }
});

export const { createReminder, updateReminder, deleteReminder, completeReminder } = reminderSlice.actions;

export default reminderSlice.reducer