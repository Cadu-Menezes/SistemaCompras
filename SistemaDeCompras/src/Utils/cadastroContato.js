const addContato = (SetContato, contato) => {
    SetContato((ListContatoOld) => [
      ...ListContatoOld,
      { id: ListContatoOld.length + 1, ...contato }
    ]);
  };
  
export default addContato;

