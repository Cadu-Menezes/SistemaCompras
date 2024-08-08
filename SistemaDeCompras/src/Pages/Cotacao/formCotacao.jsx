import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
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


const FormCotacoes = ({ addCotacao }) => {
  
  const [data, setData] = useState('');
  const [preco, setPreco] = useState('');
  const [produto, setProduto] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data && preco) {
      addCotacao({ data, preco, produto });
      navigate('/cotacao');
    }
  };

  const handleError = (event) => {
    event.preventDefault();
      navigate('/cotacao');
  };

  return (

    <FormContainer>
      
      <Typography variant="h4">Cadastrar Fornecedor</Typography>
      
      <Form onSubmit={handleSubmit}>
        
        <TextField
          label="Data"
          variant="outlined"
          margin="normal"
          fullWidth
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <TextField
          label="Preço"
          variant="outlined"
          margin="normal"
          fullWidth
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <TextField
          label="Produto"
          variant="outlined"
          margin="normal"
          fullWidth
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
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

export default FormCotacoes;