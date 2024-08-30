import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

export const addProdutoToFirebase = async (product) => {
  try {
    console.log("Adicionando produto:", product);
    const docRef = await addDoc(collection(db, "produtos"), product);
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
  }
};

export const getProdutosFromFirebase = async () => {
  try {
    console.log("Obtendo produtos do Firebase");
    const querySnapshot = await getDocs(collection(db, "produtos"));
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