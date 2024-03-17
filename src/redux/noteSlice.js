import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "notes",
    initialState: {
        value: []
    },
    reducers: {
        addNote: state => {
            state.value.push("TESTING")
        }
    }
})

export const { addNote } = noteSlice.actions;

export const selectNote = state => state.notes.value

export default noteSlice.reducer; 