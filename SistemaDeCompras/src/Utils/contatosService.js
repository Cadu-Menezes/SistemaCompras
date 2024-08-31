import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

export const addContatoToFirebase = async (contato) => {
  try {
    const docRef = await addDoc(collection(db, "contatos"), contato);
    console.log("Contato adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar contato: ", e);
  }
};

export const getContatosFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contatos"));
    const contatos = querySnapshot.docs.map(doc => ({
      id: doc.id,  
      ...doc.data()
    }));
    return contatos;
  } catch (e) {
    console.error("Erro ao obter contatos: ", e);
    return [];
  }
};

export const deleteContatoFromFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, "contatos", id));
    console.log("Contato excluído com ID: ", id);
  } catch (e) {
    console.error("Erro ao excluir contato: ", e);
  }
};

export const updateContatoInFirebase = async (id, updatedContato) => {
  try {
    const contatoRef = doc(db, "contatos", id);
    await updateDoc(contatoRef, updatedContato);
    console.log("Contato atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar contato: ", e);
  }
};