import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addPedidoToFirebase, getPedidosFromFirebase, updatePedidoInFirebase } from '../../Utils/pedidosService';

const FormContainer = styled.div`
  margin-left: 30%;
  width: 40%;
  align-items: center;
  margin-top: 2rem;
  height: 60vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const FormPedidos = ({ pedidos = [], setPedidos }) => {
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [status, setStatus] = useState('aberta');  
  const [usuario, setUsuario] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDados = async () => {
      if (id) {
        const pedidosData = await getPedidosFromFirebase();
        const pedidoToEdit = pedidosData.find((pedido) => pedido.id === id);
        if (pedidoToEdit) {
          setData(pedidoToEdit.data);
          setDescricao(pedidoToEdit.descricao);
          setProduto(pedidoToEdit.produto);
          setQuantidade(pedidoToEdit.quantidade || '');
          setStatus(pedidoToEdit.status || 'aberta');
          setUsuario(pedidoToEdit.usuario);
        }
      } else {
        const usuarioLogado = localStorage.getItem('authToken');
        setUsuario(usuarioLogado);
      }
    };

    fetchDados();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data && descricao && produto && quantidade && status && usuario) {
      const pedidoData = {
        data,
        descricao,
        produto,
        quantidade,
        status,  
        usuario,
      };

      try {
        if (id) {
          await updatePedidoInFirebase(id, pedidoData);
        } else {
          await addPedidoToFirebase(pedidoData);
        }

        if (setPedidos) {
          const updatedPedidos = await getPedidosFromFirebase();
          setPedidos(updatedPedidos);
        }

        navigate('/pedido');
      } catch (error) {
        console.error("Erro ao salvar o pedido:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/pedido');
  };

  return (
    <FormContainer>
      <Typography variant="h4">
        {id ? 'Editar Pedido' : 'Cadastrar Pedido'}
      </Typography>
      
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Usuário"
          variant="outlined"
          margin="normal"
          fullWidth
          value={usuario}
          InputProps={{ readOnly: true }}
        />

        <TextField
          label="Data"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
          fullWidth
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <TextField
          label="Produto"
          variant="outlined"
          margin="normal"
          fullWidth
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />

        <TextField
          label="Descrição"
          variant="outlined"
          margin="normal"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <TextField
          label="Quantidade"
          variant="outlined"
          margin="normal"
          fullWidth
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          type="number"
        />

        <TextField
          select
          label="Status"
          variant="outlined"
          margin="normal"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="aberta">Aberta</MenuItem>
          <MenuItem value="em cotacao">Em Cotação</MenuItem>
          <MenuItem value="cotada">Cotada</MenuItem>
        </TextField>

        <StyledButtons>
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Salvar' : 'Cadastrar'}
          </Button>

          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancelar
          </Button>
        </StyledButtons>
      </Form>
    </FormContainer>
  );
};

export default FormPedidos;