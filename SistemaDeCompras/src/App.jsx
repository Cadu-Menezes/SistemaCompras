import React, { Suspense, lazy, useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import { checkAuth } from './Utils/AuthUtils'; 
import ListRequisicao from '../src/Pages/Requisicao/ListRequisicao';
import Login from './Pages/Login';

const Home = lazy(() => import('./Pages/Home'));
const ListProdutos = lazy(() => import('./Pages/Produtos/list'));
const FormProdutos = lazy(() => import('./Pages/Produtos/form'));
const ListFornecedor = lazy(() => import('./Pages/Fornecedor/listFornecedor'));
const FormFornecedores = lazy(() => import('./Pages/Fornecedor/formFornecedor'));
const ListContato = lazy(() => import('./Pages/Contato/listContato'));
const FormContato = lazy(() => import('./Pages/Contato/formContato'));
const ListPedido = lazy(() => import('./Pages/Pedido/listPedido'));
const FormPedido = lazy(() => import('./Pages/Pedido/formPedido'));
const ListUsuarios = lazy(() => import('./Pages/Usuarios/listUsuarios'));
const FormUsuarios = lazy(() => import('./Pages/Usuarios/FormUsuarios'));

const breakpoints = {
  small: "576px"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await checkAuth();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <NativeBaseProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<Login breakpoints={breakpoints} setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <>
              <NavBar breakpoints={breakpoints} setIsAuthenticated={setIsAuthenticated} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<ListProdutos />} />
                <Route path="/produtos/cadastrar" element={<FormProdutos />} />
                <Route path="/produtos/editar/:id" element={<FormProdutos />} />
                
                <Route path="/fornecedores" element={<ListFornecedor />} />
                <Route path="/fornecedores/cadastrar" element={<FormFornecedores />} />
                <Route path="/fornecedores/editar/:id" element={<FormFornecedores />} />

                <Route path="/contatos" element={<ListContato />} />
                <Route path="/contatos/cadastrar" element={<FormContato />} />
                <Route path="/contatos/editar/:id" element={<FormContato />} />

                <Route path="/pedido" element={<ListPedido />} />
                <Route path="/pedido/cadastrar" element={<FormPedido />} />
                <Route path="/pedido/editar/:id" element={<FormPedido />} />

                <Route path="/requisicao" element={<ListRequisicao />} />

                <Route path="/usuarios" element={<ListUsuarios />} />
                <Route path="/usuarios/cadastrar" element={<FormUsuarios />} />
                <Route path="/usuarios/editar/:id" element={<FormUsuarios />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          )}
        </Suspense>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;