import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

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

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem('authToken', token);
        return user;
    } catch (firebaseError) {
        console.error('Erro ao fazer login com Firebase:', firebaseError);
        try {
            const usersRef = collection(db, 'usuarios');  
            const q = query(usersRef, where("Email", "==", email), where("Senha", "==", password));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                localStorage.setItem('authToken', userDoc.id);
                return userData;
            } else {
                throw new Error('Usuário não encontrado na tabela usuarios');
            }
        } catch (customAuthError) {
            console.error('Erro ao fazer login pela tabela usuarios:', customAuthError);
            throw customAuthError;
        }
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
        const token = localStorage.getItem('authToken');
        if (token) {
            // Simular verificação do token
            resolve(true);
        } else {
            resolve(null);
        }
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