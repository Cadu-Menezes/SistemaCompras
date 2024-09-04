import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getCotacoesDoUsuario, deleteCotacaoFromFirebase } from '../../Utils/cotacoesService';
import { addRequisicaoToFirebase } from '../../Utils/requisicaoService';

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
      const usuarioLogado = localStorage.getItem('authToken');
      const cotacoesFromFirebase = await getCotacoesDoUsuario(usuarioLogado);
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

  const handleSolicitarRequisicao = async (cotacao) => {
    try {
      console.log('Solicitando cotação para a requisição:', cotacao);
      await addRequisicaoToFirebase(cotacao);
      alert('Cotação solicitada com sucesso!');
    } catch (error) {
      console.error('Erro ao solicitar cotação:', error);
    }
  };

  return (
    <StyledContainer>
      <Titulo>Cadastro de Requisição</Titulo>

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
              <TableCell>Descrição</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotacoesFiltradas.map((cotacao) => (
              <TableRow key={cotacao.id}>
                <TableCell>{cotacao.id}</TableCell>
                <TableCell>{format(new Date(cotacao.data), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{cotacao.descricao}</TableCell>
                <TableCell>{cotacao.produto}</TableCell>
                <TableCell>{cotacao.quantidade}</TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/cotacao/editar/${cotacao.id}`)}
                      sx={{
                        minWidth: '100px',
                        fontSize: { xs: '0.75rem', sm: '1rem' },
                      }}
                    >
                      Editar
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(cotacao.id)}
                      sx={{
                        minWidth: '100px',
                        fontSize: { xs: '0.75rem', sm: '1rem' },
                      }}
                    >
                      Excluir
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSolicitarRequisicao(cotacao)}
                      sx={{
                        minWidth: '100px',
                        fontSize: { xs: '0.75rem', sm: '1rem' },
                      }}
                    >
                      Solicitar Cotação
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

export default ListCotacao;