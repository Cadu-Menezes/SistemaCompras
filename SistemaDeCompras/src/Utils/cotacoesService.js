import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
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

export const getCotacoesDoUsuario = async (usuarioId) => {
  try {
    console.log('Buscando cotações do usuário:', usuarioId);

    const cotacoesRef = collection(db, 'cotacoes'); 
    const q = query(cotacoesRef, where('usuario', '==', usuarioId));
    const querySnapshot = await getDocs(q);
    
    const cotacoes = [];
    querySnapshot.forEach((doc) => {
      cotacoes.push({ id: doc.id, ...doc.data() });
    });
    console.log('Cotações encontradas:', cotacoes);
    return cotacoes;
  } catch (error) {
    console.error('Erro ao buscar cotações do usuário:', error.message);
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