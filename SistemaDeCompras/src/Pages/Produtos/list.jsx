import React, { useEffect, useState } from 'react';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';



const StyledContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Titulo = styled('h1')({

});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '2rem',
  width: '100%',
  maxWidth: '800px',
});


const ListProdutos = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    console.log('Buscando produtos...');
    const produtos = await getProdutosFromFirebase();
    console.log('Produtos obtidos:', produtos);
    setProducts(produtos);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/produtos/cadastrar'); 
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
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.Nome}</TableCell>
                  <TableCell>{product.Preco}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

      </StyledContainer>

  );
};

export default ListProdutos;