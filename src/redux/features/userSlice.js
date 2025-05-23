import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
      state.token = action.payload
      state.isLoggedIn = action.payload
    },
    clearUser: (state) => {
      state.user = {}
      state.token = {}
      state.isLoggedIn = false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions

export default userSlice.reducer