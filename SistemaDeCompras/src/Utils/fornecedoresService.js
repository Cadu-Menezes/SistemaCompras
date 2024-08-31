import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

// Função para adicionar um fornecedor ao Firebase
export const addFornecedorToFirebase = async (fornecedor) => {
  try {
    const docRef = await addDoc(collection(db, "fornecedores"), fornecedor);
    console.log("Fornecedor adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar fornecedor: ", e);
  }
};

// Função para obter fornecedores do Firebase
export const getFornecedoresFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "fornecedores"));
    const fornecedores = querySnapshot.docs.map(doc => ({
      id: doc.id,  // Aqui é onde pegamos o ID do Firebase
      ...doc.data()
    }));
    return fornecedores;
  } catch (e) {
    console.error("Erro ao obter fornecedores: ", e);
    return [];
  }
};

// Função para excluir um fornecedor do Firebase
export const deleteFornecedorFromFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, "fornecedores", id));
    console.log("Fornecedor excluído com ID: ", id);
  } catch (e) {
    console.error("Erro ao excluir fornecedor: ", e);
  }
};

// Função para atualizar um fornecedor no Firebase
export const updateFornecedorInFirebase = async (id, updatedFornecedor) => {
  try {
    const fornecedorRef = doc(db, "fornecedores", id);
    await updateDoc(fornecedorRef, updatedFornecedor);
    console.log("Fornecedor atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar fornecedor: ", e);
  }
};