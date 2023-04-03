import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {authSlice} from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
    Promise<unknown>,
    RootState,
    unknown,
    Action<unknown>
    >;
