import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addUsuarioToFirebase, updateUsuarioInFirebase, getUsuariosFromFirebase } from '../../Utils/usuariosService';

const FormContainer = styled.div`
  margin: 2rem auto; 
  width: 80%; 
  max-width: 600px; 
  padding-top: 60px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px); 
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

const FormUsuarios = ({ refreshUsuarios }) => {

  const navigate = useNavigate();
  const { id } = useParams();  // id da URL
  const [Nome, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Moderacao, setModeracao] = useState('');

  // Verifica o papel do usuário logado
  const userRole = localStorage.getItem('perfil'); // 'admin' ou 'colaborador'

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (id) {
        const usuarios = await getUsuariosFromFirebase();
        const userToEdit = usuarios.find(user => user.id === id);
        if (userToEdit) {
          setName(userToEdit.Nome);
          setEmail(userToEdit.Email);
          setSenha(userToEdit.Senha);
          setModeracao(userToEdit.Moderacao);
        }
      }
    };
    fetchUsuarios();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Nome && Email && Senha && Moderacao) {
      if (id) {
        await updateUsuarioInFirebase(id, { Nome, Email, Senha, Moderacao });
      } else {
        await addUsuarioToFirebase({ Nome, Email, Senha, Moderacao });
      }
      if (refreshUsuarios) {
        await refreshUsuarios();
      }
      navigate('/usuarios');
    }
  };

  const handleError = (event) => {
    event.preventDefault();
    navigate('/usuarios');
  };

  return (
    <FormContainer>
      <Typography variant="h4">{id ? 'Editar Usuário' : 'Cadastrar Usuário'}</Typography>
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
          label="Senha"
          variant="outlined"
          margin="normal"
          fullWidth
          value={Senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="moderacao-label">Moderação</InputLabel>
          <Select
            labelId="moderacao-label"
            value={Moderacao}
            onChange={(e) => setModeracao(e.target.value)}
            label="Moderação"
          >
            {/* Se o usuário logado for colaborador, ele só pode cadastrar colaboradores */}
            {userRole === 'admin' && (
              <MenuItem value="admin">Admin</MenuItem>
            )}
            <MenuItem value="colaborador">Colaborador</MenuItem>
          </Select>
        </FormControl>

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

export default FormUsuarios;