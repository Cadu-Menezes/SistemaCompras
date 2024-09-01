import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

export const addCotacaoToFirebase = async (cotacao) => {
  try {
    const docRef = await addDoc(collection(db, "cotacoes"), cotacao);
    console.log("Cotação adicionada com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar cotação: ", e);
  }
};

export const getCotacoesFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cotacoes"));
    const cotacoes = querySnapshot.docs.map(doc => ({
      id: doc.id,  
      ...doc.data()
    }));
    return cotacoes;
  } catch (e) {
    console.error("Erro ao obter cotações: ", e);
    return [];
  }
};

export const deleteCotacaoFromFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, "cotacoes", id));
    console.log("Cotação excluída com ID: ", id);
  } catch (e) {
    console.error("Erro ao excluir cotação: ", e);
  }
};

export const updateCotacaoInFirebase = async (id, updatedCotacao) => {
  try {
    const cotacaoRef = doc(db, "cotacoes", id);
    await updateDoc(cotacaoRef, updatedCotacao);
    console.log("Cotação atualizada com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar cotação: ", e);
  }
};