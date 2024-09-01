import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Button } from '@mui/material';
import { format } from 'date-fns';
import { getRequisicoesFromFirebase } from '../../Utils/requisicaoService';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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

const ListRequisicao = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchRequisicoes = async () => {
      const requisicoesFromFirebase = await getRequisicoesFromFirebase();
      setRequisicoes(requisicoesFromFirebase);
    };

    fetchRequisicoes();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleAprovar = (id) => {
    alert(`Requisição ${id} aprovada`);
  };

  const handleRejeitar = (id) => {
    alert(`Requisição ${id} rejeitada`);
  };

  const requisicoesFiltradas = requisicoes.filter((requisicao) =>
    requisicao.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <StyledContainer>
      <Titulo>Lista de Requisições</Titulo>

      <Box display="flex" justifyContent="space-between" width="50%" maxWidth="800px" mb={2}>
        <TextField
          label="Filtrar por Produto"
          variant="outlined"
          value={filtro}
          onChange={handleFiltroChange}
        />
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID da Requisição</TableCell>
              <TableCell>ID da Cotação</TableCell>
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
            {requisicoesFiltradas.map((requisicao) => (
              <TableRow key={requisicao.id}>
                <TableCell>{requisicao.id}</TableCell> {/* ID da Requisição */}
                <TableCell>{requisicao.cotacaoId}</TableCell> {/* ID da Cotação */}
                <TableCell>{format(new Date(requisicao.data), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{requisicao.preco}</TableCell>
                <TableCell>{requisicao.produto}</TableCell>
                <TableCell>{requisicao.fornecedor}</TableCell>
                <TableCell>{requisicao.quantidade}</TableCell>
                <TableCell>{requisicao.valorTotal}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleAprovar(requisicao.id)}
                  >
                    <ThumbUpIcon />
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleRejeitar(requisicao.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <ThumbDownIcon />
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

export default ListRequisicao;