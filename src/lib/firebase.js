import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatty-32b2d.firebaseapp.com",
  projectId: "chatty-32b2d",
  storageBucket: "chatty-32b2d.appspot.com",
  messagingSenderId: "119194292587",
  appId: "1:119194292587:web:4bfbb0d57bdc9ee8db7c2e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()