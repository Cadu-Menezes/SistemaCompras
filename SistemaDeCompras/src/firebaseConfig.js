import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCIiTHAhRx8KWtw4qOijjXiohWQIuLrCOc",
  authDomain: "sistemadecompras-f362f.firebaseapp.com",
  projectId: "sistemadecompras-f362f",
  storageBucket: "sistemadecompras-f362f.appspot.com",
  messagingSenderId: "873184738188",
  appId: "1:873184738188:web:19f3f543cfae54d02e74a9",
  measurementId: "G-E94N0SBTZS"
};

// Verifica se a aplicação Firebase já foi inicializada (estava com erros quando eu abria uma janela anônima junto)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
