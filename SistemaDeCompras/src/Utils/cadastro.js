const addProduto = (SetProdutos, product) => {
    SetProdutos((ListProdutosOld) => [
      ...ListProdutosOld,
      { id: ListProdutosOld.length + 1, ...product }
    ]);
  };
  
export default addProduto;