import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addContatoToFirebase, updateContatoInFirebase, getContatosFromFirebase } from '../../Utils/contatosService';
import { getFornecedoresFromFirebase } from '../../Utils/fornecedoresService';


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

const FormContatos = ({ refreshContatos }) => {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContato = async () => {
      if (id) {
        const contatos = await getContatosFromFirebase();
        const contatoToEdit = contatos.find(contato => contato.id === id);
        if (contatoToEdit) {
          setNome(contatoToEdit.nome || '');
          setNumero(contatoToEdit.numero || '');
          setFornecedor(contatoToEdit.fornecedor || '');
          setIsEditing(true);
        }
      }
    };

    const fetchFornecedores = async () => {
      const fornecedoresData = await getFornecedoresFromFirebase();
      setFornecedores(fornecedoresData);
    };

    fetchContato();
    fetchFornecedores();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nome && numero && fornecedor) {
      const contatoData = { nome, numero, fornecedor };
      if (isEditing) {
        await updateContatoInFirebase(id, contatoData);
      } else {
        await addContatoToFirebase(contatoData);
      }
      if (refreshContatos) {
        await refreshContatos();
      }
      navigate('/contatos');
    }
  };

  const handleError = (event) => {
    event.preventDefault();
    navigate('/contatos');
  };

  return (
    <FormContainer>
      <Typography variant="h4">{isEditing ? 'Editar Contato' : 'Cadastrar Contato'}</Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          margin="normal"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Número"
          variant="outlined"
          margin="normal"
          fullWidth
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          select
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.Nome}>{fornecedor.Nome}</option>
          ))}
        </TextField>
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

export default FormContatos;