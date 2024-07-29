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
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 80px;
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
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
  font-weight: 300;
  margin-top: 80px;
  background-color: rgba(43, 154, 49, 0.2); /* Cor verde com opacidade */
  color: #ffff;
  padding: 5px 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CategoryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffdf34;
  color: #181f28;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ligth;
  border: none;

  &:hover {
    background-color: #96d433;
    color: #fff;
  }
`;
