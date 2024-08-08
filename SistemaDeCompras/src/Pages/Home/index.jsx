import styled from "styled-components";
import React from "react";

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

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <Title>Projeto do caduzinho!</Title>
      <Text>
        Aqui você vai encontrar a metologia XGH no mais alto nível.
      </Text>
    </StyledHome>
  );
};

export default Home;