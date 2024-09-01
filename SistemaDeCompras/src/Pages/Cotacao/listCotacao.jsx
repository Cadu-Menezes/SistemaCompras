import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getCotacoesFromFirebase, deleteCotacaoFromFirebase } from '../../Utils/cotacoesService';

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
  maxWidth: '1200px', 
  overflowX: 'auto', 
});

const ListCotacao = () => {
  const [cotacoes, setCotacoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCotacoes = async () => {
      const cotacoesFromFirebase = await getCotacoesFromFirebase();
      setCotacoes(cotacoesFromFirebase);
    };

    fetchCotacoes();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleDelete = async (id) => {
    await deleteCotacaoFromFirebase(id);
    setCotacoes(cotacoes.filter(cotacao => cotacao.id !== id));
  };

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
              <TableCell>Fornecedor</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Total</TableCell>
              <TableCell>Ações</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {cotacoesFiltradas.map((cotacao) => (
              <TableRow key={cotacao.id}>
                <TableCell>{cotacao.id}</TableCell>
                <TableCell>{format(new Date(cotacao.data), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{cotacao.preco}</TableCell>
                <TableCell>{cotacao.produto}</TableCell>
                <TableCell>{cotacao.fornecedor}</TableCell>
                <TableCell>{cotacao.quantidade}</TableCell>
                <TableCell>{cotacao.valorTotal}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate(`/cotacao/editar/${cotacao.id}`)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(cotacao.id)} 
                    style={{ marginLeft: '0.5rem' }}
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

export default ListCotacao;