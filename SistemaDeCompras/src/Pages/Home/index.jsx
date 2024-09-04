import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledHome = styled.div`
  background-color: #f0f0f0;
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {


  return (
    <StyledHome>
      <Title>Empresa ACME</Title>
      <Text>Sistema de Compras</Text>
    </StyledHome>
  );
};

export default Home;