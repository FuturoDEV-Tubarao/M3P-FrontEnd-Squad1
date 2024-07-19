import styled, { keyframes } from "styled-components";
import backgroundImage from "../../../../assets/fundo-cadastro.jpg";

export const Header = styled.div`
  display: flex;
  background: #f3f3f4;

  div {
    display: flex;
    align-items: center;
  }
`;
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #f7fafc;
`;

export const Container = styled.div`
  width: 100%;
  padding-top: 120px;
  padding-bottom: 120px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  padding: 0px;
  @media (min-width: 768px) {
    width: 45%;
  }
`;

export const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const ImageContainer = styled.div`
  width: 248px;
  height: 501px;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  margin-bottom: 40px;
  background: url(${backgroundImage}) center center / cover no-repeat;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 25%;
  }
`;

export const Image = styled.img`
  width: 248px;
  height: 501px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

export const Title = styled.p`
  color: #2b9a31;
  font-weight: bold;
`;

export const Heading = styled.h1`
  font-size: 45px;
  color: #1f2937;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  min-width: 90px;
  font-weight: bold;
  font-size: 16px;
  color: #4a5568;
  margin-right: 10px;
`;

export const Input = styled.input`
  border: 1px solid #d1d5db;
  padding: 8px;
  border-radius: 4px;
  flex-grow: 1;
`;

export const TextArea = styled.textarea`
  border: 1px solid #d1d5db;
  padding: 8px;
  border-radius: 4px;
  height: 80px;
  flex-grow: 1;
`;

export const RadioInput = styled.input`
  margin-right: 5px;
  accent-color: #2b9a31;
`;

// Pulse Animation
export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Restrictions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  div {
    display: flex;
    align-items: center;
    accent-color: #2b9a31;
    margin-right: 10px;

  label {
    margin-right: 5px;
  }

  }
`;

export const Button = styled.button`
  margin-top: 20px;
  background-color: #f4d03f;
  color: black;
  padding: 8px 25px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: light;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #2b9a31; // Green color on hover
    color: white;
  }

  animation: ${pulseAnimation} 2s infinite; // Pulse effect
`;
