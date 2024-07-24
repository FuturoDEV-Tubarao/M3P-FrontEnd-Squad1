import styled from "styled-components";
import backgroundImage from "../../assets/fundo-cadastro.jpg";

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 50px 0; // Ajustado padding vertical
`;

export const GlassCard = styled.div`
  padding: 40px; // Reduzido padding interno
  background: rgba(255, 255, 255, 0.1);
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

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export const SubHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: normal;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  outline: none;

  &::placeholder {
    color: white;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #6a6b68;
  color: white;
  border: none;
  outline: none;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: #ffdf34;
  color: Black;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #62ae1e;
    color: white;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & > * {
    flex: 1;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  @media (max-width: 768px) {
    & > * {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #e8625d;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.8rem;
  display: block;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
