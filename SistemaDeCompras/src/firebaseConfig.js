import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqo8XzzmFnpHxPb8hsR1eJIbmiR7SFloo",
  authDomain: "sistemadecompras-93b1d.firebaseapp.com",
  projectId: "sistemadecompras-93b1d",
  storageBucket: "sistemadecompras-93b1d.appspot.com",
  messagingSenderId: "490328377319",
  appId: "1:490328377319:web:80e0ea9f4932a173f99f42",
  measurementId: "G-22L14LBBWD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);