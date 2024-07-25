import { Link } from "react-router-dom";
import styled from "styled-components";

export const UpdateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  padding: 50px 0; // Ajustado padding vertical
`;

export const UpdateContent = styled.div`
  background-color: #ebebeb;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  color: black;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
`;
export const Buttons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1.2rem;

  button {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }

  // estilizacao do primeiro botão de salvar
  button:first-child {
    background-color: #4caf50;
    &:hover {
      background-color: #81c784;
    }
  }
`;

export const LinkProfile = styled(Link)`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: #b0b0b0;
  text-decoration: none;

  &:hover {
    background-color: #bfbfbf;
    color: white;
  }
`;
