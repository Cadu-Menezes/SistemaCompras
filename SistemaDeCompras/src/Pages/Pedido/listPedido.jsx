import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getPedidosDoUsuario, deletePedidoFromFirebase } from '../../Utils/pedidosService';
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

const ListPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      const usuarioLogado = localStorage.getItem('authToken');
      const pedidosFromFirebase = await getPedidosDoUsuario(usuarioLogado);
      setPedidos(pedidosFromFirebase);
    };

    fetchPedidos();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleDelete = async (id) => {
    await deletePedidoFromFirebase(id);
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSolicitarRequisicao = async (pedido) => {
    try {
      console.log('Solicitando pedido para a requisição:', pedido);
      await addRequisicaoToFirebase(pedido);
      alert('Pedido solicitado com sucesso!');
    } catch (error) {
      console.error('Erro ao solicitar pedido:', error);
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
        <Button variant="contained" color="primary" onClick={() => navigate('/pedido/cadastrar')}>
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
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidosFiltrados.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{format(new Date(pedido.data), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{pedido.descricao}</TableCell>
                <TableCell>{pedido.produto}</TableCell>
                <TableCell>{pedido.quantidade}</TableCell>
                <TableCell>{pedido.status}</TableCell>
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
                      onClick={() => navigate(`/pedido/editar/${pedido.id}`)}
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
                      onClick={() => handleDelete(pedido.id)}
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
                      onClick={() => handleSolicitarRequisicao(pedido)}
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

export default ListPedido;