import styled from "styled-components";

export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 2.5rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input, select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  span {
    color: red;
    font-size: 0.875rem;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #4caf50;
    color: #fff;

    &:hover {
      background-color: #81c784; /* Cor mais clara para hover */
    }
  }
`;
