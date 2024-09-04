import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
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
            usuario: cotacao.usuario,
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

// Buscando as requisições do usuário logado
export const getRequisicoesDoUsuario = async (usuarioId) => {
    try {
        const requisicoesRef = collection(db, 'requisicao');
        const q = query(requisicoesRef, where('usuario', '==', usuarioId));
        const querySnapshot = await getDocs(q);
        
        const requisicoes = [];
        querySnapshot.forEach((doc) => {
            requisicoes.push({ id: doc.id, ...doc.data() });
        });

        return requisicoes;
    } catch (error) {
        console.error('Erro ao buscar requisições do usuário:', error);
        throw new Error('Erro ao buscar requisições do usuário: ' + error.message);
    }
};

export const deleteRequisicaoFromFirebase = async (id) => {
    try {
        await deleteDoc(doc(db, "requisicao", id));
        console.log("Requisição excluída com ID: ", id);
    } catch (error) {
        console.error("Erro ao excluir requisição: ", error);
        throw error;
    }
};