import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addProdutoToFirebase = async (product) => {
  try {
    console.log("Adicionando produto:", product);
    const docRef = await addDoc(collection(db, "Produtos"), product);
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
  }
};

export const getProdutosFromFirebase = async () => {
  try {
    console.log("Obtendo produtos do Firebase");
    const querySnapshot = await getDocs(collection(db, "Produtos"));
    const produtos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return produtos;
  } catch (e) {
    console.error("Erro ao obter produtos: ", e);
    return [];
  }
};

export const updateProdutoInFirebase = async (id, updatedProduct) => {
  try {
    const productRef = doc(db, "Produtos", id);
    await updateDoc(productRef, updatedProduct);
    console.log("Produto atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar produto: ", e);
  }
};

export const deleteProdutoFromFirebase = async (id) => {
  try {
    
    console.log("Deletando produto com ID: ", id);

    const productRef = doc(db, "Produtos", id);
    
    await deleteDoc(productRef);
    
    console.log("Produto deletado com ID: ", id);
  
  } catch (e) {
   
    console.error("Erro ao deletar produto: ", e);
  
  }

};