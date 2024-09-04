import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Adiciona uma nova cotação
export const addCotacaoToFirebase = async (cotacao) => {
  try {
    const docRef = await addDoc(collection(db, 'cotacoes'), cotacao);
    console.log('Cotação adicionada com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar cotação: ', e);
  }
};

// Obtém todas as cotações
export const getCotaçõesFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cotacoes'));
    const cotações = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cotações;
  } catch (e) {
    console.error('Erro ao obter cotações: ', e);
    return [];
  }
};

// Obtém cotações associadas a um pedido 
export const getCotaçõesPorPedido = async (pedidoId) => {
  try {
    console.log("Buscando cotações para o pedido ID:", pedidoId); 
    
    const cotacoesCollection = collection(db, 'cotacoes');
    
    const q = query(cotacoesCollection, where('pedidoId', '==', pedidoId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("Nenhuma cotação encontrada para o pedido ID:", pedidoId);
    } else {
      console.log("Cotações encontradas para o pedido ID:", pedidoId);
    }

    const cotações = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Cotações obtidas:", cotações);
    
    return cotações;
    
  } catch (e) {
    console.error('Erro ao obter cotações para o pedido:', e);
    return [];
  }
};

// Atualiza uma cotação existente
export const updateCotacaoInFirebase = async (id, updatedCotacao) => {
  try {
    const cotacaoRef = doc(db, 'cotacoes', id);
    await updateDoc(cotacaoRef, updatedCotacao);
    console.log('Cotação atualizada com ID: ', id);
  } catch (e) {
    console.error('Erro ao atualizar cotação: ', e);
  }
};

// Exclui uma cotação
export const deleteCotacaoFromFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, 'cotacoes', id));
    console.log('Cotação excluída com ID: ', id);
  } catch (e) {
    console.error('Erro ao excluir cotação: ', e);
  }
};