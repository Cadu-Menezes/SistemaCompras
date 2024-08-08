const addFornecedor = (SetFornecedor, fornecedor) => {
    SetFornecedor((ListFornecedoresOld) => [
      ...ListFornecedoresOld,
      { id: ListFornecedoresOld.length + 1, ...fornecedor }
    ]);
  };
  
export default addFornecedor;