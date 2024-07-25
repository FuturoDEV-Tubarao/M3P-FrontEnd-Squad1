import styled, { keyframes } from "styled-components";

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
`;
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
  resize: none; /* Desativa o redimensionamento */
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

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  color: black;

  &:disabled {
    background-color: #f0f0f0;
    color: black;
  }

  &:focus {
    outline: none;
    border-color: #2b9a31;
  }

  option {
    padding: 8px;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  border: 1px solid #2b9a31;
  padding: 10px;
  display: inline-block;
  position: relative;
  margin: 4px 6px;

  &:disabled {
    color: black;
  }

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
  width: 100%;
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
  }

  svg {
    margin-right: 10px;
  }
`;

export const SpecialButton = styled(Button)`
  animation: ${pulse} 1s infinite;
  background-color: #2b9a31;
  color: white;
  margin-top: 50px;

  &:hover {
    background-color: #ffdf34;
    color: black;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #cccccc;
  color: white;

  &:hover {
    background-color: #b0b0b0;
    color: white;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #e30000;
  color: white;

  &:hover {
    background-color: #d62500;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  text-align: center;
  color: #666; // Cor do texto
  font-size: 1.2rem;
`;