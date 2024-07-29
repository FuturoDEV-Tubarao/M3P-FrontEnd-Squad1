import styled, { keyframes } from "styled-components";

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

export const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 24px;
`;

export const Content = styled.div`
  padding: 40px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 30px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  width: 100%;
`;

export const RangeInput = styled.input`
  width: 70%;
  margin: 10px 0;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #2c2f29;
    cursor: pointer;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

export const SaveButton = styled.button`
  width: 100%;
  background-color: #ffdf34;
  color: black;
  padding: 12px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  animation: ${pulseAnimation} 2s infinite;

  &:hover {
    background-color: #96d433;
    color: white;
  }
`;

export const StarRating = styled.div`
  margin-top: 15px;
  display: flex;
  font-size: 32px; // Aumento do tamanho das estrelas
  justify-content: center;
`;

export const Rate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelDescription = styled.label`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  width: 100%;
  margin-left: 95px;
`;
