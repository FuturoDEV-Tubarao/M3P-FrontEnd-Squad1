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
  padding: 50px 0 20px 0;
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

export const FormContainer = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 40rem; 
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
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  color: #4a5568;
  min-width: 150px;
  margin-right: 2px;
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
  accent-color: #2b9a31;
  margin: 10px 0px;
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
  align-items: center;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  animation: ${pulseAnimation} 2s infinite; // Pulse effect
`;

export const ButtoContainer = styled.div`
  padding-top: 20px;

  button {
    margin: 0 auto;
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
  }
`;
export const DietType = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  accent-color: #2b9a31;
  margin: 10px 0;


`;

export const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const LabelRadio = styled.label`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RadioDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
`;
