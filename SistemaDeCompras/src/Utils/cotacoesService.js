import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addCotacaoToFirebase = async (cotacao) => {
  try {
    const docRef = await addDoc(collection(db, 'cotacoes'), cotacao);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro adicionando o documento: ", e);
  }
};

export const getCotacoesFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cotacoes'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Erro obtendo documentos: ", e);
    return [];
  }
};