import styled, { keyframes } from "styled-components";

export const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 40px;
  margin-bottom: 80px; // Aumenta a separação entre seções
`;

export const Title = styled.h2`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center; // Centraliza o título
`;

export const CategoriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px;
  padding-top: 40px;
`;

export const CategoryCard = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2); // Intensifica a sombra ao passar o mouse
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    animation: ${pulseAnimation} 2s infinite;
  }
`;

export const CategoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  transition: background-color 0.3s;

  ${CategoryCard}:hover & {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 80px;
`;

export const CategoryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px; // Ajustado para corresponder ao padding do botão Hero
  background-color: #ffdf34; // Cor do fundo ajustada para corresponder ao botão Hero
  color: #181f28; // Cor do texto ajustada para melhor contraste e consistência
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ligth; // Mantém a fonte em negrito para destacar
  border: none;

  &:hover {
    background-color: #f2ca04; // Cor de hover ajustada para corresponder ao botão Hero
  }
`;
