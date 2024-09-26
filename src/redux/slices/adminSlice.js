import { createSlice } from "@reduxjs/toolkit";
import userReducers from "../Reducers/UserReducer/adminSiteReducer";
import orderReducers from "../Reducers/OrderReducer/AdminSiteReducer";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        data: []
    },
    reducers: {
        loadAdmin: (state, action) => {
            state.data = action.payload;
        },
        ...userReducers,
        ...orderReducers,
    }
});

export const { toggleOrderStatus, deleteUser, loadAdmin, addUser, editAdmin, updateUserDetails, updateOrders, removeOrders } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

