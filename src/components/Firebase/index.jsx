import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBY3KmFxq0FpW7_KkVc2tFBi2jHFuCrlrs",
    authDomain: "skill-barter-4170e.firebaseapp.com",
    projectId: "skill-barter-4170e",
    storageBucket: "skill-barter-4170e.firebasestorage.app",
    messagingSenderId: "463692804761",
    appId: "1:463692804761:web:0eecd8cab861ae6bbdfe08",
    measurementId: "G-D8J123QZFT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);