import styled from "styled-components";

export const SessionExpiredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: black;
`;

export const SessionContent = styled.div`
  background-color: #f0f0f0;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    padding: 20px;
  }

  p {
    margin-top: 12px;
    font-weight: bold;
  }
`;

export const ButtonConfirm = styled.button`
  margin-top: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ffdf34;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #96d433;
  }
`;
