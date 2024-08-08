import React from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Titulo = styled('h1')({

});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '2rem',
  width: '100%',
  maxWidth: '800px',
});

const ListFornecedor = ({ fornecedores }) => {
  
  console.log("fornecedores: ",fornecedores)

  const navigate = useNavigate();

  return (
    
    <StyledContainer>

      <Titulo>Cadastro de Fornecedores</Titulo>

      <Box display="flex" justifyContent="flex-end" width="100%" maxWidth="800px">
        <Button variant="contained" color="primary" onClick={() => navigate('/fornecedores/cadastrar')}>
          Cadastrar
        </Button>
      </Box>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>{fornecedor.id}</TableCell>
                <TableCell>{fornecedor.name}</TableCell>
                <TableCell>{fornecedor.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledContainer>
  );
};

export default ListFornecedor;