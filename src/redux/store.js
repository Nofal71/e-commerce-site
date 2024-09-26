import { configureStore } from "@reduxjs/toolkit";
import { productReducers } from "./slices/productSlice";
import { adminReducer } from "./slices/adminSlice";
import { currentUserReducer } from "./slices/currentUserSlice";

export const store = configureStore({
    reducer: {
        products: productReducers,
        admin: adminReducer,
        currentUser: currentUserReducer
    }
});
