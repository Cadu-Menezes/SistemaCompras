import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { addCotacaoToFirebase, getCotaçõesPorPedido } from '../../Utils/cotacoesService';
import { getFornecedoresFromFirebase } from '../../Utils/fornecedoresService';
import { getProdutosFromFirebase } from '../../Utils/cadastroProdutos';
import { updatePedidoStatus } from '../../Utils/pedidosService';

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
          
      // Atualiza o status do pedido com base no número de cotações
      const cotaçõesExistentes = await getCotaçõesPorPedido(pedido.id);
      const numeroCotações = cotaçõesExistentes.length; 
      
      if (numeroCotações < 3) {
        // Adiciona a nova cotação se o numero de cotações para aquele pedido for menor que 3
        await addCotacaoToFirebase(cotacao);
      }

      if (numeroCotações === 0) {
        // Atualiza o status para "em cotação" se for a primeira cotação
        await updatePedidoStatus(pedido.id, 'em cotacao');
      } else if (numeroCotações === 2) {
        // Atualiza o status para "cotada" se for a terceira cotação
        await updatePedidoStatus(pedido.id, 'cotada');
      } else if (numeroCotações > 2) {
        // Caso o número de cotações exceda 3, exibe uma mensagem ou desativa a funcionalidade
        alert('Não é possível cadastrar mais de 3 cotações para este pedido.');
        return;
      }
  
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