// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNySnRIOaQ-Htvf88vePgp6_0QdnnJYjQ",
  authDomain: "mylogue-proj.firebaseapp.com",
  projectId: "mylogue-proj",
  storageBucket: "mylogue-proj.appspot.com",
  messagingSenderId: "169553993077",
  appId: "1:169553993077:web:1d53eccdee728d53f3473c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);