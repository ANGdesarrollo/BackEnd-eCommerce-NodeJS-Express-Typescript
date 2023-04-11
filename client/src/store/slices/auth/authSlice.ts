import {createSlice} from '@reduxjs/toolkit'
import {AuthState} from "./interfaceAuth";

export const initialState: AuthState = {
    isLogged: false,
    username: null,
    loading: false,
    checkSessionAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLoading: (state: AuthState, action) => {
          state.loading = action.payload;
        },
        onError: (state: AuthState, action) => {
            state.loading = action.payload;
        },
        onSignUp: (state:AuthState, action) => {
            state.isLogged = action.payload.isLogged;
            state.username = action.payload.username;
        },
        onAuthSession: (state: AuthState, action) => {
            state.checkSessionAuth = action.payload.checkSessionAuth;
            state.username = action.payload.username;
            state.isLogged = action.payload.isLogged;
        },
        onLogOut: (state: AuthState, action) => {
            state.isLogged = action.payload;
        }
    },
})

export const { onSignUp, onLoading, onError, onAuthSession, onLogOut } = authSlice.actions;
