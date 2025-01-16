import { toast } from "react-toastify";
import { updateUserInFirestore } from "../../../Firebase";

const orderReducers = {
    updateOrders: (state, action) => {
        const productId = action.payload;
        if (state.currentUser.orders.ordersData && !state.currentUser.orders.ordersData.includes(productId)) {
            state.currentUser.orders.ordersData = [...state.currentUser.orders.ordersData, productId];
            toast.success('Order Placed Success');
        } else {
            toast.warn('Already Placed');
        }
        updateUserInFirestore(state.currentUser.userId, state.currentUser)
    },

};

export default orderReducers;
