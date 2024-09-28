
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./cofig/firebase";

export const addUserToFirestore = async (user) => {
    const userDoc = doc(db, 'users', user.userId);

    try {
        const doc = await getDoc(userDoc);
        if (!doc.exists()) {
            await setDoc(userDoc, user);
            console.log('User added successfully.');
        } else {
            console.log('User already exists.');
        }
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
    }
};

export const updateUserInFirestore = async (userId, updatedUser) => {
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, updatedUser);
};

export const deleteUserInFireStore = async (userId) => {
    try {
        const usersCollection = collection(db, 'users');
        const userDocs = await getDocs(usersCollection);
        const userDoc = userDocs.docs.find(doc => doc.data().userId === userId);
        if (userDoc) {
            await deleteDoc(doc(db, 'users', userDoc.id));
        } else {
            console.log(`No user found with the userId: ${userId}`);
        }
    } catch (error) {
        console.error("Error deleting user: ", error);
    }
};


export const getAllUsersFromFirestore = async () => {
    const usersCollection = collection(db, 'users');
    const user = await getDocs(usersCollection);
    const usersList = user.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
};

export const getUserData = async (email) => {
    const usersCollection = collection(db, 'users');
    const userDocs = await getDocs(usersCollection);
    const userDoc = userDocs.docs.find(doc => doc.data().userDetails.email === email);
    if (userDoc) {
        const user = userDoc.data();
        return user
    }
    return null
}
export const CheckUser = async (email) => {
    const usersCollection = collection(db, 'users');
    const userDocs = await getDocs(usersCollection);
    const userDoc = userDocs.docs.find(doc => doc.data().userDetails.email === email);
    if (userDoc) {
        return true
    } else {
        return false
    }
}
