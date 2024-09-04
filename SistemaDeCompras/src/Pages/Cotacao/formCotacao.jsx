import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addCotacaoToFirebase, getCotacoesFromFirebase, updateCotacaoInFirebase } from '../../Utils/cotacoesService';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';

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

const FormCotacoes = ({ cotacoes = [], setCotacoes }) => {
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDados = async () => {
      const produtosData = await getProdutosFromFirebase();
      setProdutos(produtosData);

      // Carrega as cotações e preenche os campos ao editar
      if (id) {
        const cotacoesData = await getCotacoesFromFirebase();
        const cotacaoToEdit = cotacoesData.find((cotacao) => cotacao.id === id);
        if (cotacaoToEdit) {
          setData(cotacaoToEdit.data);
          setDescricao(cotacaoToEdit.descricao);
          setProduto(cotacaoToEdit.produto);
          setQuantidade(cotacaoToEdit.quantidade || '');
          setUsuario(cotacaoToEdit.usuario);
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

    if (data && descricao && produto && quantidade && usuario) {
      const cotacaoData = {
        data,
        descricao,
        produto,
        quantidade,
        usuario
      };

      try {
        if (id) {
          await updateCotacaoInFirebase(id, cotacaoData);
        } else {
          await addCotacaoToFirebase(cotacaoData);
        }

        if (setCotacoes) {
          const updatedCotacoes = await getCotacoesFromFirebase();
          setCotacoes(updatedCotacoes);
        }

        navigate('/cotacao');
      } catch (error) {
        console.error("Erro ao salvar a cotação:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/cotacao');
  };

  return (
    <FormContainer>
      <Typography variant="h4">
        {id ? 'Editar Cotação' : 'Cadastrar Cotação'}
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
          variant="outlined"
          margin="normal"
          fullWidth
          select
          value={produto}
          onChange={(e) => setProduto(e.target.value)} 
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Selecione um produto</option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.Nome}>{produto.Nome}</option> 
          ))}
        </TextField>

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

export default FormCotacoes;