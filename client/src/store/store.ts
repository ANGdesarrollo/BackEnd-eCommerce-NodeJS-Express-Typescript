import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {authSlice} from "./slices/auth/authSlice";
import {productsSlice} from "./slices/products/productSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer
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
