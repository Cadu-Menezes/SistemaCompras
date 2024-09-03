import React, { useEffect, useState } from 'react';
import { getUsuariosFromFirebase, editUsuarioFromFiresebase, deleteUsuarioFromFirebase } from '../../Utils/usuariosService';
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

const ListUsuarios = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  const fetchUsers = async () => {
    console.log('Buscando usuarios...');
    const usuarios = await getUsuariosFromFirebase();
    console.log('usuarios obtidos:', usuarios);
    setUsers(usuarios);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/usuarios/cadastrar'); 
  };

  const handleEditUser= (userId) => {
    // Navegar para a página de edição de produto com o ID do produto
    navigate(`/usuarios/editar/${userId}`);
  };

  const handleDeleteUser= async (userid) => {
    if (window.confirm('Tem certeza que deseja excluir este usuario?')) {
      await deleteUsuarioFromFirebase(userid);
      fetchUsers(); // Atualizar a lista de usuarios após exclusão
    }
  };

  return (
    <StyledContainer>
      <Titulo>Cadastro de Usuarios</Titulo>

      <Box display="flex" justifyContent="flex-end" width="100%" maxWidth="800px">
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Cadastrar
        </Button>
      </Box>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Senha</TableCell>
              <TableCell>Moderação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.Nome}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Senha}</TableCell>
                <TableCell>{user.Moderacao}</TableCell>
                <TableCell>
                  <Box display="flex" gap="1rem">
                    <Button 
                      variant="contained" 
                      color="secondary"  
                      onClick={() => handleEditUser(user.id)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error"  
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Excluir
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledContainer>
  );
};

export default ListUsuarios;