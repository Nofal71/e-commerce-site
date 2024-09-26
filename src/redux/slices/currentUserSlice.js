import { createSlice } from "@reduxjs/toolkit";
import CartReducer from "../Reducers/CartReducer/customerSiteReducer";
import UserReducer from "../Reducers/UserReducer/customerSiteReducer";
import orderReducers from "../Reducers/OrderReducer/CustomerSiteReducer";

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        currentUser: null
    },
    reducers: {
        loadCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        ...UserReducer,
        ...CartReducer,
        ...orderReducers
    }
});

export const { loadCurrentUser, updateCurrentCart, removeFromCurrentCart, updateCurrentUserDetails, addUser, updateOrders } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
