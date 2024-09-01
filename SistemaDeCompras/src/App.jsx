import React, { Suspense, lazy, useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import { addProdutoToFirebase, getProdutosFromFirebase } from './Utils/cadastroProdutos';
import { addFornecedorToFirebase, getFornecedoresFromFirebase } from './Utils/fornecedoresService';
import { addContatoToFirebase, getContatosFromFirebase } from './Utils/contatosService';
import { addCotacaoToFirebase, getCotacoesFromFirebase } from './Utils/cotacoesService';

import Login from './Pages/Login'; 

const Home = lazy(() => import('./Pages/Home'));
const ListProdutos = lazy(() => import('./Pages/Produtos/list'));
const FormProdutos = lazy(() => import('./Pages/Produtos/form'));
const ListFornecedor = lazy(() => import('./Pages/Fornecedor/listFornecedor'));
const FormFornecedores = lazy(() => import('./Pages/Fornecedor/formFornecedor'));
const ListContato = lazy(() => import('./Pages/Contato/listContato'));
const FormContato = lazy(() => import('./Pages/Contato/formContato'));
const ListCotacao = lazy(() => import('./Pages/Cotacao/listCotacao'));
const FormCotacoes = lazy(() => import('./Pages/Cotacao/formCotacao'));

const breakpoints = {
  small: "576px"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para controle de autenticação
  const [products, setProducts] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);

  const fetchData = async () => {
    const produtosData = await getProdutosFromFirebase();
    const fornecedoresData = await getFornecedoresFromFirebase();
    const contatosData = await getContatosFromFirebase();
    const cotacoesData = await getCotacoesFromFirebase();

    setProducts(produtosData);
    setFornecedores(fornecedoresData);
    setContatos(contatosData);
    setCotacoes(cotacoesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <Router>
        {/* Se não estiver autenticado, renderiza o componente de Login */}
        {!isAuthenticated ? (
          <Login 
            breakpoints={breakpoints} 
            LogoTitle="Kduzin" 
            setIsAuthenticated={setIsAuthenticated} 
          />
        ) : (
          <>
            <NavBar breakpoints={breakpoints} LogoTitle={"Caduzin"} />
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Rotas para Produtos */}
                <Route path='/produtos' element={<ListProdutos products={products} />} />
                <Route path='/produtos/cadastrar' element={<FormProdutos addProdutoToFirebase={(product) => addProdutoToFirebase(product).then(() => fetchData())} />} />
                <Route path='/produtos/editar/:id' element={<FormProdutos products={products} />} />

                {/* Rotas para Fornecedores */}
                <Route path='/fornecedores' element={<ListFornecedor fornecedores={fornecedores} />} />
                <Route path='/fornecedores/cadastrar' element={<FormFornecedores addFornecedorToFirebase={(fornecedor) => addFornecedorToFirebase(fornecedor).then(() => fetchData())} />} />
                <Route path='/fornecedores/editar/:id' element={<FormFornecedores fornecedores={fornecedores} />} />

                {/* Rotas para Contatos */}
                <Route path='/contatos' element={<ListContato contatos={contatos} />} />
                <Route path='/contatos/cadastrar' element={<FormContato addContatoToFirebase={(contato) => addContatoToFirebase(contato).then(() => fetchData())} />} />
                <Route path='/contatos/editar/:id' element={<FormContato contatos={contatos} />} />

                {/* Rotas para Cotações */}
                <Route path='/cotacao' element={<ListCotacao cotacoes={cotacoes} produtos={products} />} />
                <Route path='/cotacao/cadastrar' element={<FormCotacoes produtos={products} fornecedores={fornecedores} addCotacaoToFirebase={(cotacao) => addCotacaoToFirebase(cotacao).then(() => fetchData())} />} />
                <Route path='/cotacao/editar/:id' element={<FormCotacoes cotacoes={cotacoes} produtos={products} fornecedores={fornecedores} />} />

                {/* Rota Home */}
                <Route path='/' element={<Home />} />
              </Routes>
            </Suspense>
          </>
        )}
      </Router>
    </NativeBaseProvider>
  );
}

export default App;