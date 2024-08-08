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

const ListContato = ({ contatos }) => {
  
  console.log("contatos: ",contatos)

  const navigate = useNavigate();

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
              <TableCell>Numero</TableCell>
              <TableCell>Fornecedor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contatos.map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.id}</TableCell>
                <TableCell>{contato.name}</TableCell>
                <TableCell>{contato.numero}</TableCell>
                <TableCell>{contato.fornecedor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledContainer>
  );
};

export default ListContato;