import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig';

export const addPedidoToFirebase = async (pedido) => {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), pedido);
    console.log("Pedido adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar pedido: ", e);
  }
};

export const getPedidosFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pedidos"));
    const pedidos = querySnapshot.docs.map(doc => ({
      id: doc.id,  
      ...doc.data()
    }));
    return pedidos;
  } catch (e) {
    console.error("Erro ao obter pedidos: ", e);
    return [];
  }
};

export const getPedidosDoUsuario = async (usuarioId) => {
  try {
    console.log('Buscando pedidos do usuário:', usuarioId);

    const pedidosRef = collection(db, 'pedidos'); 
    const q = query(pedidosRef, where('usuario', '==', usuarioId));
    const querySnapshot = await getDocs(q);
    
    const pedidos = [];
    querySnapshot.forEach((doc) => {
      pedidos.push({ id: doc.id, ...doc.data() });
    });
    console.log('Pedidos encontrados:', pedidos);
    return pedidos;
  } catch (error) {
    console.error('Erro ao buscar pedidos do usuário:', error.message);
    return [];
  }
};

export const deletePedidoFromFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, "pedidos", id));
    console.log("Pedido excluído com ID: ", id);
  } catch (e) {
    console.error("Erro ao excluir pedido: ", e);
  }
};

export const updatePedidoInFirebase = async (id, updatedPedido) => {
  try {
    const pedidoRef = doc(db, "pedidos", id);
    await updateDoc(pedidoRef, updatedPedido);
    console.log("Pedido atualizado com ID: ", id);
  } catch (e) {
    console.error("Erro ao atualizar pedido: ", e);
  }
};