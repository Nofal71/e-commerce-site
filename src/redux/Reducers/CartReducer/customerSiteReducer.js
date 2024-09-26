import { toast } from "react-toastify";
import { updateUserInFirestore } from "../../../Firebase/globalData";

const CartReducer = {
    updateCurrentCart: (state, action) => {
        const productId = action.payload;
        const cart = state.currentUser.cart;
        if (state.currentUser.cart && !state.currentUser.cart.includes(productId)) {
            state.currentUser.cart = [...cart, productId];
            toast.success('Product Added in Cart Success');
        } else {
            toast.warn('Product is already in the cart!');
        }
        updateUserInFirestore(state.currentUser.userId, state.currentUser)
    },
    removeFromCurrentCart: (state, action) => {
        const productId = action.payload;
        state.currentUser.cart = state.currentUser.cart.filter(e => e !== productId)
        toast.success('Product Removed From Cart!');
        updateUserInFirestore(state.currentUser.userId, state.currentUser)
    }
};

export default CartReducer;
