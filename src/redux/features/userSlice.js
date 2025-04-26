import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:{}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state,action) => {
          state.user=action.payload
    },
    clearUser: (state) => {
      state.user={}
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = userSlice.actions

export default userSlice.reducer