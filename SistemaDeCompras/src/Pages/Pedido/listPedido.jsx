import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Collapse, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getPedidosDoUsuario, deletePedidoFromFirebase } from '../../Utils/pedidosService';
import { getCotaçõesPorPedido } from '../../Utils/cotacoesService'; 
import CotacaoModal from '../../Components/CotacaoModal'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const StyledContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Titulo = styled('h1')({});

const StyledTableContainer = styled(TableContainer)(({
  marginTop: '2rem',
  width: '100%',
  maxWidth: '1200px',
  overflowX: 'auto',
}));

const CollapsibleTableRow = ({ pedido, cotações, onSolicitarCotacao, fetchCotações }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && !cotações.length) {
      fetchCotações(pedido.id); // busca cotações quando a linha é expandida
    }
  }, [open, cotações, fetchCotações, pedido.id]);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandClick}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
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
              onClick={() => onSolicitarCotacao(pedido)}
              sx={{
                minWidth: '100px',
                fontSize: { xs: '0.75rem', sm: '1rem' },
              }}
            >
              Cadastrar Cotação
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell colSpan={8} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="cotações">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Produto</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Fornecedor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cotações.length > 0 ? (
                  cotações.map((cotacao) => (
                    <TableRow key={cotacao.id}>
                      <TableCell>{format(new Date(cotacao.data), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{cotacao.produto}</TableCell>
                      <TableCell>{cotacao.quantidade}</TableCell>
                      <TableCell>{cotacao.valorTotal}</TableCell>
                      <TableCell>{cotacao.fornecedor}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>Nenhuma cotação encontrada</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ListPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cotações, setCotações] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      const usuarioLogado = localStorage.getItem('authToken');
      const pedidosFromFirebase = await getPedidosDoUsuario(usuarioLogado);
      setPedidos(pedidosFromFirebase);
    };

    fetchPedidos();
  }, []);

  const fetchCotações = async (pedidoId) => {
    try {
      console.log("Buscando cotações para o pedido ID:", pedidoId);
      const cotaçõesFromFirebase = await getCotaçõesPorPedido(pedidoId);
      console.log("Cotação por Pedido: ", cotaçõesFromFirebase);
      setCotações(prevCotações => ({
        ...prevCotações,
        [pedidoId]: cotaçõesFromFirebase
      }));
    } catch (error) {
      console.error("Erro ao buscar cotações: ", error);
    }
  };

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

  const handleSolicitarCotacao = (pedido) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleColapseCotacao = (pedido) => {
    setSelectedPedido(pedido);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPedido(null);
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
              <TableCell />
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
              <CollapsibleTableRow 
                key={pedido.id} 
                pedido={pedido} 
                cotações={cotações[pedido.id] || []}
                onSolicitarCotacao={handleSolicitarCotacao}
                fetchCotações={fetchCotações}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {selectedPedido && (
        <CotacaoModal
          open={openModal}
          onClose={handleCloseModal}
          pedido={selectedPedido}
        />
      )}
    </StyledContainer>
  );
};

export default ListPedido;