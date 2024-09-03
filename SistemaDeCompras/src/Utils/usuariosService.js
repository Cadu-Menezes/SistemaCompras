import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addUsuarioToFirebase = async (user) => {
  try {
    console.log("Adicionando Usuario:", user);
    const docRef = await addDoc(collection(db, "usuarios"), user);
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
  }
};

export const getUsuariosFromFirebase = async () => {
  try {
    console.log("Obtendo Usuarios do Firebase");
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const produtos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return produtos;
  } catch (e) {
    console.error("Erro ao obter Usuarios: ", e);
    return [];
  }
};

export const updateUsuarioInFirebase = async (id, updateduser) => {
  try {
    const userRef = doc(db, "usuarios", id);
    await updateDoc(userRef, updateduser);
    console.log("Usuario atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar Usuario: ", e);
  }
};

export const deleteUsuarioFromFirebase = async (id) => {
  try {
    
    console.log("Deletando Usuario com ID: ", id);

    const userRef = doc(db, "usuarios", id);
    
    await deleteDoc(userRef);
    
    console.log("Usuario deletado com ID: ", id);
  
  } catch (e) {
   
    console.error("Erro ao deletar Usuario: ", e);
  
  }

};