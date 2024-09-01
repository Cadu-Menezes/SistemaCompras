import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addCotacaoToFirebase, getCotacoesFromFirebase, updateCotacaoInFirebase } from '../../Utils/cotacoesService';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';
import { getFornecedoresFromFirebase } from '../../Utils/fornecedoresService';

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

const FormCotacoes = ({ cotacoes, setCotacoes }) => {
  const [data, setData] = useState('');
  const [preco, setPreco] = useState('');
  const [produto, setProduto] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProdutosEFornecedores = async () => {
      const produtosData = await getProdutosFromFirebase();
      const fornecedoresData = await getFornecedoresFromFirebase();
      setProdutos(produtosData);
      setFornecedores(fornecedoresData);
    };

    fetchProdutosEFornecedores();

    if (id) {
      const cotacaoToEdit = cotacoes.find((cotacao) => cotacao.id === id);
      if (cotacaoToEdit) {
        setData(cotacaoToEdit.data);
        setPreco(cotacaoToEdit.preco);
        setProduto(cotacaoToEdit.produto); 
        setFornecedor(cotacaoToEdit.fornecedor);
        setQuantidade(cotacaoToEdit.quantidade || '');
        setValorTotal(cotacaoToEdit.valorTotal || '');
      }
    }
  }, [id, cotacoes]);

  useEffect(() => {
    if (produto) {
      const produtoSelecionado = produtos.find((p) => p.Nome === produto);
      if (produtoSelecionado) {
        setPreco(produtoSelecionado.Preco);
        setValorTotal(quantidade * produtoSelecionado.Preco);
      }
    }
  }, [produto, produtos, quantidade]);

  useEffect(() => {
    if (preco && quantidade) {
      setValorTotal(preco * quantidade);
    }
  }, [preco, quantidade]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data && preco && produto && fornecedor && quantidade && valorTotal) {
      const cotacaoData = { data, preco, produto, fornecedor, quantidade, valorTotal };

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
          label="Preço"
          variant="outlined"
          margin="normal"
          fullWidth
          value={preco}
          InputProps={{ readOnly: true }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          select
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.Nome}>{fornecedor.Nome}</option>
          ))}
        </TextField>

        <TextField
          label="Quantidade"
          variant="outlined"
          margin="normal"
          fullWidth
          value={quantidade}
          onChange={(e) => {
            const novaQuantidade = e.target.value;
            setQuantidade(novaQuantidade);
            if (preco) {
              setValorTotal(novaQuantidade * preco);
            }
          }}
          type="number"
        />

        <TextField
          label="Valor Total"
          variant="outlined"
          margin="normal"
          fullWidth
          value={valorTotal}
          InputProps={{ readOnly: true }}
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