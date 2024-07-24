import styled from "styled-components";
import backgroundImage from "../../assets/fundo-login.jpg";

export const LoginContainer = styled.div`
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
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  color: white;
`;

export const Subtitle = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: normal;
  color: white;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);

  color: white;
  border: none;
  outline: none;

  &::placeholder {
    color: white;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #ffdf34;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #62ae1e;
    color: white;
  }
`;

export const ErrorMessage = styled.span`
  color: #e8625d;
  font-size: 0.875rem;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  display: block;
`;
