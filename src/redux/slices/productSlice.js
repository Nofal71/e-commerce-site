import { createSlice } from "@reduxjs/toolkit";
import productsReducer from "../Reducers/ProductReducer/productsReducer";

export const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: []
    },
    reducers: {
        loadProducts: (state, action) => {
            state.products = action.payload;
        },
        ...productsReducer
    }
});


export const { loadProducts, addProduct, removeProduct, updateProduct } = productSlice.actions;
export const productReducers = productSlice.reducer;
