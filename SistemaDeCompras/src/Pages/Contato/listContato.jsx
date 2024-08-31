import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getContatosFromFirebase, deleteContatoFromFirebase } from '../../Utils/contatosService';

const StyledContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Titulo = styled('h1')({
  marginBottom: '1rem',
});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '2rem',
  width: '100%',
  maxWidth: '800px',
});

const ListContato = () => {
  const [contatos, setContatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContatos = async () => {
      const contatosFromFirebase = await getContatosFromFirebase();
      setContatos(contatosFromFirebase);
    };

    fetchContatos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/contatos/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este contato?")) {
      await deleteContatoFromFirebase(id);
      setContatos(contatos.filter(contato => contato.id !== id));
    }
  };

  return (
    <StyledContainer>
      <Titulo>Cadastro de Contatos</Titulo>
      <Box display="flex" justifyContent="flex-end" width="100%" maxWidth="800px">
        <Button variant="contained" color="primary" onClick={() => navigate('/contatos/cadastrar')}>
          Cadastrar
        </Button>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Fornecedor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contatos.map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.id}</TableCell>
                <TableCell>{contato.nome}</TableCell>
                <TableCell>{contato.numero}</TableCell>
                <TableCell>{contato.fornecedor}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleEdit(contato.id)}
                    style={{ marginRight: '1rem' }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(contato.id)}
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

export default ListContato;