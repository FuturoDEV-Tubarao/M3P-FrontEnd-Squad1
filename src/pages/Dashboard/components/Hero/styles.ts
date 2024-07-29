import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animação de pulsação
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const HeroContainer = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0d1923;
  background-position: center;
  height: auto;
  padding: 40px 12%;
  color: #131313;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 600px;
    padding: 0 5%;
  }

  @media (min-width: 992px) {
    padding: 0 5%;
  }

  @media (min-width: 1220px) {
    height: 650px;
    padding: 0 11%;
  }

  @media (min-width: 1800px) {
    height: 700px;
    padding: 0 18%;
  }
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50%;
    text-align: left;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start; // Alinha os botões à esquerda
  }
`;

export const Title = styled.h1`
  margin-bottom: 0px;
  color: #f4f4f3;

  @media (min-width: 768px) {
    font-size: 70px;
  }

  @media (min-width: 1200px) {
    font-size: 70px;
  }
`;

export const Description = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  color: #f4f4f3;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px; // Espaçamento entre os botões
`;

export const Button = styled.button`
  background-color: #ffdf34;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: light;

  &:hover {
    background-color: #96d433;
    color: #ffffff;
  }
`;

export const SpecialButton = styled(NavLink)`
  animation: ${pulse} 1s infinite;
  background-color: #96d433; // Cor especial para este botão
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: light;
  color: #131313;
  text-decoration: none;

  &:hover {
    background-color: #ffdf34; // Cor de hover especial
  }

  svg {
    margin-right: 5px; // Espaço entre o ícone e o texto
  }
`;

export const Image = styled.img`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
