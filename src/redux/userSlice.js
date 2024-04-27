import { createSlice } from "@reduxjs/toolkit";
import { logOutUser } from "../utils/api";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    notes: []
  },
  reducers: {
    createUser: {
      reducer(state, action) {
        return action.payload
      },
      prepare(notifyUser) {
        const { _id, userName, organization, profileImage, bannerImage, isLoggedIn, notes } = notifyUser
        return {
          payload: {
            userId: _id,
            userName,
            organization,
            profileImage,
            bannerImage,
            isLoggedIn: isLoggedIn,
            notes: notes
          }
        }
      }
    },
    editUserCredentials: (state, action) => {
      return {
        ...state,
        userName: action.payload.userName,
        organization: action.payload.organization
      }
    },
    editUserProfileImage: (state, action) => {
      return {
        ...state,
        profileImage: action.payload
      }
    },
    editUserBanner: (state, action) => {
      return {
        ...state,
        bannerImage: action.payload
      }
    },
    logOut: (state, action) => {
      logOutUser(state)
      return { isLoggedIn: false }
    },
  }
});

export const { createUser, logOut, editUserProfileImage, editUserBanner, editUserCredentials } = userSlice.actions;

export default userSlice.reducer; 