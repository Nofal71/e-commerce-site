// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5yfOkAI3q3a99vzdXQOGBIu73Xhhmseo",
  authDomain: "store-aad94.firebaseapp.com",
  projectId: "store-aad94",
  storageBucket: "store-aad94.appspot.com",
  messagingSenderId: "740834802980",
  appId: "1:740834802980:web:571ca3dd264fe17dfb87b1",
  measurementId: "G-2X90JCLTYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const imageDb = getStorage(app)
