import styled from "styled-components";


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;


  @media (max-width: 768px) {
    padding: 40px 20px; // Reduz o padding lateral em dispositivos móveis
  }
`;


export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 10px 0 0 3px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; // Centraliza o título e os filtros verticalmente no mobile
    gap: 10px; // Espaçamento entre o título e os checkboxes
  }
`;


export const Title = styled.h2`
  font-size: 35px;
  font-weight: bold;
`;


export const Filters = styled.div`
  display: flex;
  align-items: center;
`;


export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 20px;
  color: #666;
`;


export const Checkbox = styled.input`
  accent-color: #4caf50;
  margin-right: 5px;
  width: 18px;
  height: 18px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
`;