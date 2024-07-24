import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../utils/api";

const initialState = {
    allUsers: [],
    loading: false,
  }

export const loadAllUsers = createAsyncThunk('allUsers/loadAllUsers', async () => {
    // console.log("AllUsers")
    // let token = await SecureStore.getItemAsync("secureToken");
    const apiResponse = await fetch(BASE_URL + '/api/users', {
        method: 'GET',
      
    })
    
  const response = await apiResponse.json();
  console.log("AllUsers", response)
  const sortedUsers = response.sort((a, b) => {
    if (a._id === self._id) return -1;
    if (b._id === self._id) return 1;
    if (a.userName.toUpperCase() < b.userName.toUpperCase()) return -1;
    return a.userName.toUpperCase() > b.userName.toUpperCase() ? 1 : 0;
});

  return sortedUsers

})


 const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    
    refreshAllUsers: (state, action) => {
      
        state = action.payload
    
    },
},  
  extraReducers: (builder) => {
    console.log('extra builder')
    builder
      .addCase(loadAllUsers.pending, (state) => {
        state.loading = true
       
      })
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        
        console.log("ACTION>PAYLOAD",action.payload)
        state.loading = false
       state.allUsers = action.payload.users
      })
      .addCase(loadAllUsers.rejected, (state, action) => {
       console.log("REJECTED")
       state.loading = false
      });
  },
});

export const { refreshAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer; 