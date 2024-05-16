import { createSlice, nanoid } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name: "reminders",
    initialState: [],
    reducers: {
        createReminder: {
            reducer(state, action) {
                console.log(action.payload)
                state.push(action.payload)
            },
            prepare(title, dueDay, token) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        dueDay,
                        token,
                        isChecked: false,
                        isCompleted: false,
                        isDeleted: false
                    }
                }
            }
        },
        updateReminder: (state, action) => {
            const { id, title, dueDay } = action.payload
            const existingReminder = state.find(reminder => reminder.id === id)
            if (existingReminder) {
                existingReminder.title = title
                existingReminder.dueDay = dueDay
            }
        },
        completeReminder: (state, action) => {
            const existingReminder = state.find(reminder => reminder.id === action.payload)
            if (existingReminder) {
                existingReminder.isCompleted = true
            }
        },
        deleteReminder: (state, action) => {
            const existingReminder = state.find(reminder => reminder.id === action.payload)
            if (existingReminder) {
                existingReminder.isDeleted = true
            }
        }
    }
});

export const { createReminder, updateReminder, deleteReminder, completeReminder } = reminderSlice.actions;

export default reminderSlice.reducer