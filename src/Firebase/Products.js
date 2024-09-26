import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db, imageDb } from './cofig/firebase';
import { deleteObject, ref } from "firebase/storage";

export const updateFireBase = async (productId, productData) => {
    try {
        const productRef = doc(db, 'products', productId);
        await setDoc(productRef, productData, { merge: true });
    } catch (error) {
        console.error('Error updating product: ', error);
    }
};


export const deleteProductFromFirebase = async (productId) => {
    try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
    } catch (error) {
        console.error('Error deleting product: ', error.message);
    }
};

export const getProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const product = await getDocs(productsCollection);
        const productList = product.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return productList;
    } catch (error) {
        console.error('Error fetching products: ', error);
    }
};


export const deleteImageFromStorage = async (imagePath) => {
    try {
        if (imagePath) {
            const imageRef = ref(imageDb, imagePath)
            await deleteObject(imageRef)
        }
    } catch (error) {
        console.error(error, 'Failed to Delete')
    }
}