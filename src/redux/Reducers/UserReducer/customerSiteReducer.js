import { nanoid } from "@reduxjs/toolkit";
import { addUserToFirestore, updateUserInFirestore } from "../../../Firebase/globalData";
import { toast } from "react-toastify";

const UserReducer = {
    updateCurrentUserDetails: (state, action) => {
        const userDetails = action.payload;
        state.currentUser.userDetails = { ...state.currentUser.userDetails, ...userDetails };
        updateUserInFirestore(state.currentUser.userId, state.currentUser)
        toast.success('Details Saved')
    },
    addUser: (state, action) => {
        const user = {
            userId: nanoid(),
            admin: false,
            cart: [],
            orders: { state: 'Pending', ordersData: [] },
            userDetails: action.payload
        };
        state.currentUser = user
        addUserToFirestore(user)
    },

};

export default UserReducer;
