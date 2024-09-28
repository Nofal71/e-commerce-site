import {  deleteUserInFireStore, updateUserInFirestore } from "../../../Firebase/FireBaseServices";
import { toast } from "react-toastify";

const userReducers = {
   
    editAdmin: (state, action) => {
        const { userId, admin } = action.payload;
        const user = state.data.find(e => e.userId === userId);
        if (user) {
            user.admin = admin;
        }
        updateUserInFirestore(userId, user)
        toast.success("Admin Updated")
    },
    
    deleteUser: (state, action) => {
        const userId = action.payload;
        state.data = state.data.filter((e) => e.userId !== userId)
        toast.success("User Deleted")
        deleteUserInFireStore(userId)
    }
};

export default userReducers;
