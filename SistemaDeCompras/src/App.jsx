import React, { Suspense, lazy, useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import FakeProdutos from '../src/Utils/fake';
import {addProdutoToFirebase} from './Utils/cadastroProdutos';
import FakeFornecedores from '../src/Utils/fakeFornecedor';
import addFornecedor from '../src/Utils/cadastroFornecedor';
import FakeContatos from './Utils/fakeContato';
import addContato from '../src/Utils/cadastroContato';
import FakeCotacoes from './Utils/fakeCotacao';
import addCotacao from '../src/Utils/cadastroCotacoes';
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

  useEffect(() => {
    FakeFornecedores(setFornecedores);
    FakeContatos(setContatos);
    FakeCotacoes(setCotacoes);
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
                
                <Route path='/produtos' element={<ListProdutos products={products} />} />
                <Route path='/produtos/cadastrar' element={<FormProdutos addProdutoToFirebase={(product) => addProdutoToFirebase(setProducts, product)} />} />
                <Route path='/produtos/editar/:id' element={<FormProdutos />} />  {/* Adicione esta linha */}
                
                <Route path='/fornecedores' element={<ListFornecedor fornecedores={fornecedores} />} />
                <Route path='/fornecedores/cadastrar' element={<FormFornecedores addFornecedor={(fornecedor) => addFornecedor(setFornecedores, fornecedor)} />} />
                
                <Route path='/contatos' element={<ListContato contatos={contatos} />} />
                <Route path='/contatos/cadastrar' element={<FormContato addContato={(contato) => addContato(setContatos, contato)} />} />
                
                <Route path='/cotacao' element={<ListCotacao cotacoes={cotacoes} />} />
                <Route path='/cotacao/cadastrar' element={<FormCotacoes addCotacao={(cotacao) => addCotacao(setCotacoes, cotacao)} />} />
                
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