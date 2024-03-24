import { createSlice, nanoid } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
      },
    reducers: {
        createUser: (state, action) => {
            return {
              isLoggedIn: true,
              ...action.payload,
            }
          },
            // prepare(userName, organization, isLoggedIn) {
            //     console.log("RAN", userName, organization, isLoggedIn)
            //     return {
            //         payload: {
            //             id: nanoid(),
            //             userName:userName,
            //             organization: organization,
            //             isLoggedIn: isLoggedIn
            //         }
            //     }
            // }
       // }
    }
})

export const { createUser } = userSlice.actions;

export default userSlice.reducer; 