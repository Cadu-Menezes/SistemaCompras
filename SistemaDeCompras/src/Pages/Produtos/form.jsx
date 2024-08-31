import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { addProdutoToFirebase, updateProdutoInFirebase, getProdutosFromFirebase } from '../../Utils/cadastroProdutos';

const FormContainer = styled.div`
  margin-left: 30%;
  width: 40%;
  align-items: center;
  margin-top: 2rem;
  height: 60vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const FormProdutos = ({ refreshProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams();  // Pegue o id da URL
  const [Nome, setName] = useState('');
  const [Preco, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const produtos = await getProdutosFromFirebase();
        const productToEdit = produtos.find(product => product.id === id);
        if (productToEdit) {
          setName(productToEdit.Nome);
          setPrice(productToEdit.Preco);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Nome && Preco) {
      if (id) {
        await updateProdutoInFirebase(id, { Nome, Preco: parseFloat(Preco) });
      } else {
        await addProdutoToFirebase({ Nome, Preco: parseFloat(Preco) });
      }
      if (refreshProducts) {
        await refreshProducts();
      }
      navigate('/produtos');
    }
  };

  const handleError = (event) => {
    event.preventDefault();
    navigate('/produtos');
  };

  return (
    <FormContainer>
      <Typography variant="h4">{id ? 'Editar Produto' : 'Cadastrar Produto'}</Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Nome}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Preço"
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          value={Preco}
          onChange={(e) => setPrice(e.target.value)}
        />
        <StyledButtons>
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button variant="contained" color="error" onClick={handleError}>
            Fechar
          </Button>
        </StyledButtons>
      </Form>
    </FormContainer>
  );
};

export default FormProdutos;