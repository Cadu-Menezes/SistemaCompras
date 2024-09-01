import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'; 

export const addRequisicaoToFirebase = async (cotacao) => {
    try {
        const requisicaoData = {
            cotacaoId: cotacao.id, 
            data: cotacao.data,
            preco: cotacao.preco,
            produto: cotacao.produto,
            fornecedor: cotacao.fornecedor,
            quantidade: cotacao.quantidade,
            valorTotal: cotacao.valorTotal,
        };

        const docRef = await addDoc(collection(db, 'requisicao'), requisicaoData);
        console.log('Requisição adicionada com ID:', docRef.id);
    } catch (error) {
        console.error('Erro ao adicionar requisição:', error);
        throw error;
    }
};

export const getRequisicoesFromFirebase = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'requisicao'));
        const requisicoes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return requisicoes;
    } catch (error) {
        console.error('Erro ao recuperar requisições:', error);
        throw error;
    }
};