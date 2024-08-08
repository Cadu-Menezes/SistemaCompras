import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

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

const ListCotacao = ({ cotacoes }) => {
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  // Função para atualizar o filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  // Filtra as cotações com base no filtro de produto
  const cotacoesFiltradas = cotacoes.filter((cotacao) =>
    cotacao.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <StyledContainer>
      <Titulo>Cadastro de Cotação</Titulo>

      <Box display="flex" justifyContent="space-between" width="50%" maxWidth="800px" mb={2}>
        
        <TextField
          label="Filtrar por Produto"
          variant="outlined"
          value={filtro}
          onChange={handleFiltroChange}
          
        />

        <Button variant="contained" color="primary" onClick={() => navigate('/cotacao/cadastrar')}>
          Cadastrar
        </Button>
        
      </Box>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotacoesFiltradas.map((cotacao) => (
              <TableRow key={cotacao.id}>
                <TableCell>{cotacao.id}</TableCell>
                <TableCell>{format(new Date(cotacao.data), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{cotacao.preco}</TableCell>
                <TableCell>{cotacao.produto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledContainer>
  );
};

export default ListCotacao;