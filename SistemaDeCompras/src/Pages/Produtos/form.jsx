import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  ${'' /* background-color: blue; */}
  width: 100%;
  
`;


const FormProdutos = ({ addProduto }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && price) {
      addProduto({ name, price: parseFloat(price) });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Preço"
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <StyledButtons>
          
          <Button variant="contained" color="primary" type="submit">
            Cadastrar
          </Button>

          <Button variant="contained" color="error" type="submit" onClick={handleError}>
            Fechar
          </Button>

        </StyledButtons>

      </Form>
    </FormContainer>
  );
};

export default FormProdutos;