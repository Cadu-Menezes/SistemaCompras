import React, { useEffect, useState } from 'react';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';
import { useNavigate } from 'react-router-dom';

const ListProdutos = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    console.log('Fetching products...');
    const produtos = await getProdutosFromFirebase();
    setProducts(produtos);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/produtos/cadastrar'); 
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button onClick={handleAddProduct}>Cadastrar Novo Produto</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListProdutos;