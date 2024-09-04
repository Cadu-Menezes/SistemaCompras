import React, { useEffect, useState } from 'react';
import { getProdutosFromFirebase, editProdutoInFirebase, deleteProdutoFromFirebase } from '../../Utils/cadastroProdutos';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';

const StyledContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Titulo = styled('h1')({});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '2rem',
  width: '100%',
  maxWidth: '800px',
});

const ListProdutos = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    const produtos = await getProdutosFromFirebase();
    setProducts(produtos);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/produtos/cadastrar'); 
  };

  const handleEditProduct = (productId) => {
    // Navegar para a página de edição de produto com o ID do produto
    navigate(`/produtos/editar/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProdutoFromFirebase(productId);
      fetchProducts(); // Atualizar a lista de produtos após exclusão
    }
  };

  return (
    <StyledContainer>
      <Titulo>Cadastro de Produtos</Titulo>

      <Box display="flex" justifyContent="flex-end" width="100%" maxWidth="800px">
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Cadastrar
        </Button>
      </Box>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.Nome}</TableCell>
                <TableCell>{product.Preco}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleEditProduct(product.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledContainer>
  );
};

export default ListProdutos;