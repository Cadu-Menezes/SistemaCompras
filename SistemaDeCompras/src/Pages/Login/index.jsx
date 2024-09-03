import styled from "styled-components";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertMessage from '../../Components/AlertMessage';
import LembrarMeCheck from '../../Components/CheckBox';
import { login } from '../../Utils/AuthUtils';  

const StyledContainer = styled.div`
  background-color: #C2C2C2;
  max-width: 100%;
  overflow-x: hidden;
  height: 100vh;
  color: black;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.style}

  @media(min-width: ${(props) => props.breakpoints?.small || '768px'}){
    flex-direction: row;
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const StyledForm = styled(Box)`
  background-color: #E2E2E2;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  ${(props) => props.style}

  @media(min-width: ${(props) => props.breakpoints?.small || '768px'}){
    width: 50%;
  }
`;

const Login = (props) => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const [alerta, setAlerta] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login(email, password);
      console.log('Usuário logado:', user);
  
      if (props.setIsAuthenticated) {
        props.setIsAuthenticated(true);
      }
      navigate("/");
    } catch (error) {
      console.error('Erro de autenticação:', error);
      setAlerta({
        severidade: "error",
        titulo: "Erro de autenticação",
        mensagem: error.message 
      });
    }
  };

  return (
    
    <StyledContainer breakpoints={props.breakpoints}>
      
      <StyledForm
        breakpoints={props.breakpoints}
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onSubmit={handleLogin}
      >
        <h1>Login</h1>

        {alerta && (
          <AlertMessage 
            severidade={alerta.severidade} 
            titulo={alerta.titulo} 
            mensagem={alerta.mensagem} 
            aoFechar={() => setAlerta(null)}
          />
        )}

        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <LembrarMeCheck rememberMe={rememberMe} setRememberMe={setRememberMe} /> 
        
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          type="submit"
        >
          Entrar
        </Button>
        
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;