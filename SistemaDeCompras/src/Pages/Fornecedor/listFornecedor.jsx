import React, { useEffect, useState } from 'react';
import { getFornecedoresFromFirebase, deleteFornecedorFromFirebase } from '../../Utils/fornecedoresService';
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

const ListFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  const fetchFornecedores = async () => {
    const fornecedores = await getFornecedoresFromFirebase();
    setFornecedores(fornecedores);
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleEditFornecedor = (id) => {
    navigate(`/fornecedores/editar/${id}`);
  };

  const handleDeleteFornecedor = async (id) => {
    await deleteFornecedorFromFirebase(id);
    fetchFornecedores(); // Atualiza a lista após a exclusão
  };

  const handleAddFornecedor = () => {
    navigate('/fornecedores/cadastrar');
  };

  return (
    <StyledContainer>
      <Titulo>Cadastro de Fornecedores</Titulo>
      <Box display="flex" justifyContent="flex-end" width="100%" maxWidth="800px">
        <Button variant="contained" color="primary" onClick={handleAddFornecedor}>
          Cadastrar
        </Button>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>{fornecedor.Nome}</TableCell>
                <TableCell>{fornecedor.Email}</TableCell>
                <TableCell>{fornecedor.CEP}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditFornecedor(fornecedor.id)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteFornecedor(fornecedor.id)}
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

export default ListFornecedores;