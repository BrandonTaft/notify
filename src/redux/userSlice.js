import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    createUser: {
      reducer(state, action) {
        return action.payload
      },
      prepare(notifyUser) {
        const {id, userName, organization, profileImage} = notifyUser
        return {
          payload: {
            id,
            userName,
            organization,
            profileImage,
            isLoggedIn: true
          }
        }
      }
    },
    editUserProfileImage: (state, action) => {
      return {
        ...state,
        profileImage: action.payload
      }
    },
    logOutUser: () => {
      return {
        isLoggedIn: false
      }
    },
  }
});

export const { createUser, logOutUser, editUserProfileImage } = userSlice.actions;

export default userSlice.reducer; 