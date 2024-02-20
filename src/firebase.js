import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7dPeirSpUed6JANRE13pxiPOS5eHDde4",
  authDomain: "justchat-a373b.firebaseapp.com",
  projectId: "justchat-a373b",
  storageBucket: "justchat-a373b.appspot.com",
  messagingSenderId: "419969504768",
  appId: "1:419969504768:web:b16e3c5cdb6eedb295aae5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();