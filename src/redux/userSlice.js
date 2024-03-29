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
        const {id, userName, organization, profileImage, bannerImage, isLoggedIn} = notifyUser
        return {
          payload: {
            id,
            userName,
            organization,
            profileImage,
            bannerImage,
            isLoggedIn: isLoggedIn,
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
    logOutUser: () => {
      return {
        isLoggedIn: false
      }
    },
  }
});

export const { createUser, logOutUser, editUserProfileImage, editUserBanner, editUserCredentials } = userSlice.actions;

export default userSlice.reducer; 