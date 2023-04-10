import {createSlice} from '@reduxjs/toolkit'
import {AuthState} from "./interfaceAuth";

export const initialState: AuthState = {
    statusAuth: false,
    username: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onSignUp: (state:AuthState, action) => {
            state.statusAuth = action.payload.statusAuth
            state.username = action.payload.username
        },
    },
})

export const { onSignUp } = authSlice.actions;
