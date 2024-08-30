import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIiTHAhRx8KWtw4qOijjXiohWQIuLrCOc",
  authDomain: "sistemadecompras-f362f.firebaseapp.com",
  projectId: "sistemadecompras-f362f",
  storageBucket: "sistemadecompras-f362f.appspot.com",
  messagingSenderId: "873184738188",
  appId: "1:873184738188:web:19f3f543cfae54d02e74a9",
  measurementId: "G-E94N0SBTZS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);