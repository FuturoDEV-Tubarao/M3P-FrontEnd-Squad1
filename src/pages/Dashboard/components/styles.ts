import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  padding: 1.1rem;
  justify-content: space-around;
  gap: 12rem;
  min-width: 100%;
  flex-wrap: wrap;
`;

export const NewRecipeButton = styled.button`
  margin-top: auto;
  padding: 1rem 1.1rem;
  border-radius: 100%;
  background: black;
  cursor: pointer;
  margin-bottom: 25px;

  &:hover {
    background-color: #292a36;
  }

  img {
    width: 37px;
  }
`;

export const Footer = styled.div`
  text-align: right;
  margin-right: 20px;
  margin-top: -40px;

  img {
    width: 20vh;
    padding-top: 4px;
  }
`;
