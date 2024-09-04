import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { addCotacaoToFirebase } from '../../Utils/cotacoesService';
import { getFornecedoresFromFirebase } from '../../Utils/fornecedoresService';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';

const CotacaoModal = ({ open, onClose, pedido }) => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const [precoProduto, setPrecoProduto] = useState(0);

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const produtosData = await getProdutosFromFirebase();
        console.log('Produtos:', produtosData);
        setProdutos(produtosData);
        const fornecedoresData = await getFornecedoresFromFirebase();
        console.log('Fornecedores:', fornecedoresData);
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchDados();
  }, []);

  const handleProdutoChange = (event) => {
    const produtoNome = event.target.value;
    setProdutoSelecionado(produtoNome);

    const produto = produtos.find(p => p.Nome === produtoNome);
    if (produto) {
      setPrecoProduto(produto.Preco);
      setValorTotal(produto.Preco * quantidade);
    }
  };

  const handleQuantidadeChange = (event) => {
    const novaQuantidade = event.target.value;
    setQuantidade(novaQuantidade);
    setValorTotal(precoProduto * novaQuantidade);
  };

  const handleFornecedorChange = (event) => {
    setFornecedorSelecionado(event.target.value);
  };

  const handleSalvarCotacao = async () => {
    const cotacao = {
      data: new Date().toISOString(),
      descricao: `Cotação para o pedido ${pedido.id}`,
      produto: produtoSelecionado,
      quantidade,
      valorTotal,
      fornecedor: fornecedorSelecionado,
      status: 'aberta',
      pedidoId: pedido.id,
    };

    try {
      await addCotacaoToFirebase(cotacao);
      alert('Cotação cadastrada com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar cotação:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Cotação</DialogTitle>
      <DialogContent>
        <TextField
          label="Produto"
          select
          fullWidth
          value={produtoSelecionado}
          onChange={handleProdutoChange}
          margin="normal"
        >
          <MenuItem value=""><em>Selecione um produto</em></MenuItem>
          {produtos.map((produto) => (
            <MenuItem key={produto.Nome} value={produto.Nome}>
              {produto.Nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Preço do Produto"
          value={precoProduto}
          margin="normal"
          fullWidth
          InputProps={{ readOnly: true }}
        />
        
        <TextField
          label="Quantidade"
          type="number"
          fullWidth
          value={quantidade}
          onChange={handleQuantidadeChange}
          margin="normal"
        />
        
        <TextField
          label="Valor Total"
          value={valorTotal}
          margin="normal"
          fullWidth
          InputProps={{ readOnly: true }}
        />
        
        <TextField
          label="Fornecedor"
          select
          fullWidth
          margin="normal"
          value={fornecedorSelecionado}
          onChange={handleFornecedorChange}
        >
          <MenuItem value=""><em>Selecione um fornecedor</em></MenuItem>
          {fornecedores.map((fornecedor) => (
            <MenuItem key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.Nome}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSalvarCotacao} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CotacaoModal;