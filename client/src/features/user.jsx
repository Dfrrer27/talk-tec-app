import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  isAuthenticated: true,
  user: null,
  loading: false, 
  registered: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: state => {
      state.registered = false;
    },
  },
})

export const { resetRegistered } = userSlice.actions;
export const userReducer = userSlice.reducer;