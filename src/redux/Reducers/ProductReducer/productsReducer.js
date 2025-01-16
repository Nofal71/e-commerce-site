import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteImageFromStorage, deleteProductFromFirebase, updateFireBase } from "../../../Firebase";

const productsReducer = {

    addProduct: (state, action) => {
        const product = {
            id: nanoid(),
            ...action.payload
        };
        state.products.push(product);
        toast.success('Product Added Success')
        updateFireBase(product.id, product);
    },

    removeProduct: (state, action) => {
        const { productId, imagePath } = action.payload
        state.products = state.products.filter(product => product.id !== productId);
        deleteProductFromFirebase(productId);
        deleteImageFromStorage(imagePath)
        toast.warn('Product removed Success')

    },

    updateProduct: (state, action) => {
        const id = action.payload.id;
        state.products = state.products.map(product => {
            if (product.id === id) {
                updateFireBase(product.id, action.payload);
                return action.payload;
            }
            return product;
        });
        toast.success('Product Updated Success')
    }

}

export default productsReducer;