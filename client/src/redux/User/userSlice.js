import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = false
            state.error = null
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        signInFailure : (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        updateUserStart : (state) => {
            state.loading = true
        },
        updateUserSuccess : (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        updateUserFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart : (state) => {
            state.loading = true;
        },
        deleteUserSuccess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUser : (state) => {
            state.loading = false,
            state.error = null,
            state.currentUser = null
        }
    }
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
