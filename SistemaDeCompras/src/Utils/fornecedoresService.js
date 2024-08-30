import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addFornecedorToFirebase = async (fornecedor) => {
  try {
    const docRef = await addDoc(collection(db, 'fornecedores'), fornecedor);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro adicionando o documento: ", e);
  }
};

export const getFornecedoresFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'fornecedores'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Erro obtendo documentos: ", e);
    return [];
  }
};