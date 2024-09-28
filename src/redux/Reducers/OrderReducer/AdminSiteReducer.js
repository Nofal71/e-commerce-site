import { toast } from "react-toastify";
import { updateUserInFirestore } from "../../../Firebase/FireBaseServices";

const orderReducers = {
    updateOrders: (state, action) => {
        const { userId, productId } = action.payload;
        const user = state.data.find(e => e.userId === userId);
        if (user && !user.orders.ordersData.includes(productId)) {
            user.orders.ordersData = [...user.orders.ordersData, productId];
            toast.success('Orders Updated Success');
        } else {
            toast.warn('Already Ordered');
        }
        updateUserInFirestore(userId, user)
    },

    removeOrders: (state, action) => {
        const { userId, productId } = action.payload;
        const user = state.data.find(e => e.userId === userId);
        if (user) {
            user.orders.ordersData = user.orders.ordersData.filter(e => e !== productId);
            toast.warn('User Details Updated Success');

        }
        updateUserInFirestore(userId, user)
    },

    toggleOrderStatus: (state, action) => {
        const { userId, orderState } = action.payload
        console.log(orderState, 'This is order state for', userId)
        const user = state.data.find(user => user.userId === userId)
        if (user && orderState.toLowerCase() === 'pending') {
            user.orders.state = 'proceed'
        } else if (user && orderState === 'proceed') {
            user.orders.state = 'pending'
        }
        console.log('This is user', { ...user.orders })
        toast.warn('Order State Updated ');
        updateUserInFirestore(userId, user)
    }

};

export default orderReducers;
