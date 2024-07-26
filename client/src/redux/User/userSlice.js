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
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        singInFailure : (state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, singInFailure} = userSlice.actions;

export default userSlice.reducer;
