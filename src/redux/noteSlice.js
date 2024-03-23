import { createSlice, nanoid } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "notes",
    initialState: 
         [
            {
                id: '0',
                content: 'lalalalalalal',
                isChecked: false,
                isCompleted: false,
                isDeleted: false,
                isNote: true,
               timeStamp: new Date().toISOString(),
               reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
            },
            {
                id: '1',
                content: 'qdqdqdqdqdqdd',
                isChecked: false,
                isCompleted: false,
                isDeleted: false,
                isNote: true,
                timeStamp: new Date().toISOString(),
                reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
            }
        ],
    
    reducers: {
        createNote: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(content) {
                return {
                    payload: {
                        id: nanoid(),
                        content,
                        timeStamp: new Date().toISOString(),
                        isChecked: false,
                        isCompleted: false,
                        isDeleted: false,
                        isNote: true,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                    }
                }
            }
        },
        updateNote: (state, action) => {
            const { id, content } = action.payload
            const existingNote = state.find(note => note.id === id)
            if (existingNote) {
                existingNote.content = content
                existingNote.timeStamp = new Date().toISOString()
            }
        },
        deleteNote: (state, action) => {
            const existingNote = state.find(note => note.id === action.payload)
            if (existingNote) {
                existingNote.isDeleted = true
            }
        },
        addReaction: (state, action) => {
            const { id, reaction } = action.payload
            const existingNote = state.find(note => note.id === id)
            if (existingNote) {
              existingNote.reactions[reaction]++
            }
          }
    }
})

export const { createNote, updateNote, deleteNote, addReaction } = noteSlice.actions;

export default noteSlice.reducer; 