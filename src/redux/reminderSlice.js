import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchReminders } from "../utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';




export const fetchAllReminders = createAsyncThunk('posts/fetchAllReminders', async () => {

    let token = await SecureStore.getItemAsync("secureToken");

    let user = await AsyncStorage.getItem("notify_user")
    const rawReminders = await fetch('https://c1b6-75-131-25-248.ngrok-free.app' + '/api/reminders', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: JSON.parse(user)._id })
    });
    const reminders = await rawReminders.json();
    console.log("REMINDERSLICE", reminders.reminders)

    return reminders


})

  const initialState = {
    reminders: [],
    loading: false,
    error: null
  } 



const reminderSlice = createSlice({
    name: "reminders",
    initialState,
    reducers: {
        createReminder: {
            reducer(state, action) {
                state.reminders.push(action.payload)
            },
            prepare(title, dueDay, token, reminderId) {
                return {
                    payload: {
                        reminderId,
                        title,
                        dueDay: JSON.parse(dueDay),
                        token,
                        isChecked: false,
                        isCompleted: false,
                        isDeleted: false
                    }
                }
            }
        },
        updateReminder: (state, action) => {
            const { reminderId, title, dueDay } = action.payload
            console.log("EDITTTTTT", action.payload)
            const existingReminder = state.reminders.find(reminder => reminder.reminderId === reminderId)
            if (existingReminder) {
                existingReminder.title = title
                existingReminder.dueDay = dueDay
            }
        },
        completeReminder: (state, action) => {
            const existingReminder = state.reminders.find(reminder => reminder.reminderId === action.payload)
            if (existingReminder) {
                existingReminder.isCompleted = true
            }
        },
        deleteReminder: (state, action) => {
            const existingReminder = state.reminders.find(reminder => reminder.reminderId === action.payload)
            if (existingReminder) {
                existingReminder.isDeleted = true
            }
        }
    },
    extraReducers: (builder) => {
        builder
              .addCase(fetchAllReminders.pending, (state) => {
                state.loading = true;
              })
            .addCase(fetchAllReminders.fulfilled, (state, action) => {
                state.loading = false;
                
                if (action.payload.success) {
                    console.log("STATE",action.payload.reminders)
                    state.reminders = action.payload.reminders
                    // return action.payload.reminders
                } else {
                    return state
                }
            })
          .addCase(fetchAllReminders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    },
});

export const { createReminder, updateReminder, deleteReminder, completeReminder } = reminderSlice.actions;

export default reminderSlice.reducer