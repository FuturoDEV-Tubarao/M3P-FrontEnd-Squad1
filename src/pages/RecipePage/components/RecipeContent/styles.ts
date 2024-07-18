import styled, { keyframes } from "styled-components";

// Estilos globais para o componente
export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: white;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const GeneralSection = styled.div``;

export const SpecialSection = styled.div`
  background-color: #f4f4f3;
  background-size: cover;
  padding: 35px;
  border-radius: 8px;
`;

export const TittleMenu = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

`
export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  height: 120px;
  color: black;
`;

export const Input = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 8px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  p {
    margin-bottom: 5px;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  background-color: #fff;
  border: 1px solid #2b9a31;
  padding: 10px;
  display: inline-block;
  position: relative;
  margin-right: 8px;

  &:checked {
    background-color: #2b9a31;
    &::after {
      content: "✔";
      font-size: 14px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 3px;
    }
  }
`;

const pulse = keyframes`
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

export const Button = styled.button`
  width: 100%; // Garante que o container ocupe toda a largura
  display: flex;
  justify-content: center;
  margin-top: 30px;
  background-color: #ffdf34;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: light;

  &:hover {
    background-color: #f2ca04;
  }

  svg {
    margin-right: 10px; // Espaço adicionado entre o ícone e o texto
  }
`;

export const SpecialButton = styled(Button)`
  animation: ${pulse} 1s infinite;
  background-color: #2b9a31; // Cor especial para este botão
  color: white;
  margin-top: 50px;

  &:hover {
    background-color: #ffdf34; // Cor de hover especial
    color: black;
  }
`;

export const DeleteButton = styled(Button)`
   background-color: red; // Cor especial para este botão
  color: white;
`

export const Radio = styled(Checkbox).attrs({ type: "radio" })``;
