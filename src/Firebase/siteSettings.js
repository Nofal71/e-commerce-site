import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./cofig/firebase"

export const saveHeaderinFireBase = async (header) => {
    try {
        const docRef = doc(db, 'settings', "Header");
        await setDoc(docRef, { header }, { merge: true })
    } catch (error) {
        console.error(error)
    }
}

export const getHeaderFromFireBase = async () => {
    try {
        const docRef = doc(db, 'settings', "Header");
        const header = await getDoc(docRef);
        if (header) return header
    } catch (error) {
        console.error(error)
    }
}