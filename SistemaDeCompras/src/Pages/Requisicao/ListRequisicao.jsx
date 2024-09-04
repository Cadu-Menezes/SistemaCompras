import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Button } from '@mui/material';
import { format } from 'date-fns';
import { getRequisicoesDoUsuario, deleteRequisicaoFromFirebase } from '../../Utils/requisicaoService';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';

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
  maxWidth: '1200px',
  overflowX: 'auto',
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: '120px',
  fontSize: { xs: '0.75rem', sm: '1rem' },
}));

const ListRequisicao = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchRequisicoes = async () => {
      const usuarioLogado = localStorage.getItem('authToken'); // Ou a maneira como você obtém o ID do usuário logado
      if (usuarioLogado) {
        const requisicoesFromFirebase = await getRequisicoesDoUsuario(usuarioLogado);
        setRequisicoes(requisicoesFromFirebase);
      }
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

  const handleExcluir = async (id) => {
    try {
      await deleteRequisicaoFromFirebase(id);
      setRequisicoes(requisicoes.filter(requisicao => requisicao.id !== id));
    } catch (error) {
      console.error('Erro ao excluir requisição:', error);
    }
  };

  const requisicoesFiltradas = requisicoes.filter((requisicao) =>
    requisicao.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <StyledContainer>
      <Titulo>Lista de Cotações</Titulo>

      <Box display="flex" justifyContent="space-between" width="100%" maxWidth="800px" mb={2}>
        <TextField
          label="Filtrar por Produto"
          variant="outlined"
          value={filtro}
          onChange={handleFiltroChange}
          fullWidth
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
                  <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleAprovar(requisicao.id)}
                    >
                      <ThumbUpIcon />
                      Aprovar
                    </StyledButton>

                    <StyledButton
                      variant="contained"
                      color="error"
                      onClick={() => handleRejeitar(requisicao.id)}
                    >
                      <ThumbDownIcon />
                      Rejeitar
                    </StyledButton>

                    <StyledButton
                      variant="contained"
                      color="warning"
                      onClick={() => handleExcluir(requisicao.id)}
                    >
                      <DeleteIcon />
                      Excluir
                    </StyledButton>
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

export default ListRequisicao;