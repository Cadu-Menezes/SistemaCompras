const addCotacao = (SetCotacao, cotacao) => {
    SetCotacao((ListCotacaoOld) => [
      ...ListCotacaoOld,
      { id: ListCotacaoOld.length + 1, ...cotacao }
    ]);
  };
  
export default addCotacao;

