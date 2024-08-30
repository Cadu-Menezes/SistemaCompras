import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addContatoToFirebase = async (contato) => {
  try {
    const docRef = await addDoc(collection(db, 'contatos'), contato);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro adicionando o documento: ", e);
  }
};

export const getContatosFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'contatos'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Erro obtendo documentos: ", e);
    return [];
  }
};