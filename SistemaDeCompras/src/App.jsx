import React, { Suspense, lazy, useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import FakeProdutos from '../src/Utils/fake';
import addProduto from '../src/Utils/cadastro';
import FakeFornecedores from '../src/Utils/fakeFornecedor';
import addFornecedor from '../src/Utils/cadastroFornecedor';
import FakeContatos from './Utils/fakeContato';
import addContato from '../src/Utils/cadastroContato';
import FakeCotacoes from './Utils/fakeCotacao';
import addCotacao from '../src/Utils/cadastroCotacoes';

const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
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
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [products, setProducts] = useState();
  useEffect(() => {
    FakeProdutos(setProducts, products);
  }, [products]);

  const [fornecedores, setFornecedores] = useState();
  useEffect(() => {
    FakeFornecedores(setFornecedores, fornecedores);
  }, [fornecedores]);

  const [contatos, setContatos] = useState();
  useEffect(() => {
    FakeContatos(setContatos, contatos);
  }, [contatos]);

  const [cotacoes, setCotacoes] = useState();
  useEffect(() => {
    FakeCotacoes(setCotacoes, cotacoes);
  }, [cotacoes]);

  return (
    <NativeBaseProvider>
      <Router>
        <NavBar breakpoints={breakpoints} LogoTitle={"Caduzin"} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route 
              path='/login' 
              element={<Login breakpoints={breakpoints} LogoTitle="Kduzin" setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path='/' 
              element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path='/produtos' 
              element={isAuthenticated ? <ListProdutos products={products} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path='/produtos/cadastrar' 
              element={isAuthenticated ? <FormProdutos addProduto={(product) => addProduto(setProducts, product)} /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path='/fornecedores' 
              element={isAuthenticated ? <ListFornecedor fornecedores={fornecedores} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path='/fornecedores/cadastrar' 
              element={isAuthenticated ? <FormFornecedores addFornecedor={(fornecedor) => addFornecedor(setFornecedores, fornecedor)} /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path='/contatos' 
              element={isAuthenticated ? <ListContato contatos={contatos} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path='/contatos/cadastrar' 
              element={isAuthenticated ? <FormContato addContato={(contato) => addContato(setContatos, contato)} /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path='/cotacao' 
              element={isAuthenticated ? <ListCotacao cotacoes={cotacoes} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path='/cotacao/cadastrar' 
              element={isAuthenticated ? <FormCotacoes addCotacao={(cotacao) => addCotacao(setCotacoes, cotacao)} /> : <Navigate to="/login" replace />} 
            />

          </Routes>
        </Suspense>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;