import { createSlice } from '@reduxjs/toolkit'


export const chatSlice = createSlice({
    name: 'tests',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
  }

  // the outside "thunk creator" function
const fetchUserById = userId => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
      try {
        // make an async call in the thunk
        const user = await userAPI.fetchById(userId)
        // dispatch an action when we get the response back
        dispatch(userLoaded(user))
      } catch (err) {
        // If something went wrong, handle it here
      }
    }
  }

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = testSlice.actions

export default testSlice.reducer