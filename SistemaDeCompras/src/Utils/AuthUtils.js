import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIiTHAhRx8KWtw4qOijjXiohWQIuLrCOc",
    authDomain: "sistemadecompras-f362f.firebaseapp.com",
    projectId: "sistemadecompras-f362f",
    storageBucket: "sistemadecompras-f362f.appspot.com",
    messagingSenderId: "873184738188",
    appId: "1:873184738188:web:19f3f543cfae54d02e74a9"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('authToken', await user.getIdToken());
        return user;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};

// Função para logout
export const logout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('authToken');
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        throw error;
    }
};

// Função para verificar sessão
export const checkAuth = async () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        }, reject);
    });
};

// Função para obter dados do perfil do usuário
export const getUserProfile = async (uid) => {
    try {
        const userDoc = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            throw new Error('Perfil do usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        throw error;
    }
};

// Função para atualizar dados do perfil do usuário
export const updateUserProfile = async (uid, profileData) => {
    try {
        const userDoc = doc(db, 'users', uid);
        await setDoc(userDoc, profileData, { merge: true });
    } catch (error) {
        console.error('Erro ao atualizar perfil do usuário:', error);
        throw error;
    }
};