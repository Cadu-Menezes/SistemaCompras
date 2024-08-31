import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addFornecedorToFirebase, updateFornecedorInFirebase, getFornecedoresFromFirebase } from '../../Utils/fornecedoresService';
import axios from 'axios';

const FormContainer = styled.div`
  margin: 2rem auto;
  width: 90%;
  max-width: 600px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const FormFornecedores = ({ refreshFornecedores }) => {
  const [Nome, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [CEP, setCEP] = useState('');
  const [Endereco, setEndereco] = useState('');
  const [Bairro, setBairro] = useState('');
  const [Cidade, setCidade] = useState('');
  const [Estado, setEstado] = useState('');
  const [Complemento, setComplemento] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams(); //id da URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedor = async () => {
      if (id) {
        const fornecedores = await getFornecedoresFromFirebase();
        const fornecedorToEdit = fornecedores.find(fornecedor => fornecedor.id === id);
        if (fornecedorToEdit) {
          setName(fornecedorToEdit.Nome);
          setEmail(fornecedorToEdit.Email);
          setCEP(fornecedorToEdit.CEP);
          setEndereco(fornecedorToEdit.Endereco || '');
          setBairro(fornecedorToEdit.Bairro || '');
          setCidade(fornecedorToEdit.Cidade || '');
          setEstado(fornecedorToEdit.Estado || '');
          setComplemento(fornecedorToEdit.Complemento || '');
          setIsEditing(true);
        }
      }
    };
    fetchFornecedor();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Nome && Email && CEP && Endereco && Bairro && Cidade && Estado) {
      const fornecedorData = { Nome, Email, CEP, Endereco, Bairro, Cidade, Estado, Complemento };
      if (isEditing) {
        await updateFornecedorInFirebase(id, fornecedorData);
      } else {
        await addFornecedorToFirebase(fornecedorData);
      }
      if (refreshFornecedores) {
        await refreshFornecedores();
      }
      navigate('/fornecedores');
    }
  };

  const handleError = (event) => {
    event.preventDefault();
    navigate('/fornecedores');
  };

  const handleCEPChange = async (event) => {
    const cep = event.target.value;
    setCEP(cep);
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data) {
          // Preenchendo os campos com os dados da API ViaCEP
          setEndereco(response.data.logradouro || Endereco);
          setBairro(response.data.bairro || Bairro);
          setCidade(response.data.localidade || Cidade);
          setEstado(response.data.uf || Estado);
          setComplemento(response.data.complemento || Complemento);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP: ", error);
      }
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4">{isEditing ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}</Typography>
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
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="CEP"
          variant="outlined"
          margin="normal"
          fullWidth
          value={CEP}
          onChange={handleCEPChange}
        />
        <TextField
          label="Endereço"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <TextField
          label="Bairro"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
        <TextField
          label="Cidade"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <TextField
          label="Estado"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        <TextField
          label="Complemento"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
        <StyledButtons>
          <Button variant="contained" color="primary" type="submit">
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button variant="contained" color="error" onClick={handleError}>
            Fechar
          </Button>
        </StyledButtons>
      </Form>
    </FormContainer>
  );
};

export default FormFornecedores;