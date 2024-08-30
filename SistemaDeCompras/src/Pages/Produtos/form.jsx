import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addProdutoToFirebase } from '../../Utils/cadastroProdutos'; // Verifique o caminho

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
  const [Nome, setName] = useState('');
  const [Preco, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log('Clicou submit');
    console.log('Nome: ',Nome);
    console.log('Preco: ', Preco);
    event.preventDefault();
    if (Nome && Preco) {
      await addProdutoToFirebase({ Nome, Preco: parseFloat(Preco) });
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
      <Typography variant="h4">Cadastrar Produto</Typography>
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
            Cadastrar
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