import { createSlice } from '@reduxjs/toolkit';
import {IActionProductGetAll, IActionProduct, IProductInitial} from './interface';

export const initialState: IProductInitial = {
    products: [],
    onLoading: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductsSlice: (state: IProductInitial, action: IActionProductGetAll) => {
            state.products = action.payload;
        },
        updateProductSlice: (state: IProductInitial, action: IActionProduct) => {
            const index = state.products.findIndex(el => el._id === action.payload._id);
            state.products[index] = action.payload;
        },
        deleteProductSlice: (state: IProductInitial, action: IActionProduct) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
        createProductSlice: (state: IProductInitial, action: IActionProduct) => {
            state.products = [...state.products, action.payload]
        },
        onLoading: (state: IProductInitial, action) => {
            state.onLoading = action.payload;
        }
    },
});

export const { getProductsSlice, updateProductSlice, deleteProductSlice, createProductSlice, onLoading } = productsSlice.actions;
