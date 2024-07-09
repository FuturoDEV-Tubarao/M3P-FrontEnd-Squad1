import styled from "styled-components";

export const ListContainer = styled.div`
  min-width: 540px;
  min-height: 75vh;
  border-radius: 2rem;
  box-shadow: 0 -2px 1px rgb(227, 194, 32, 0.5);
  background: #ffdb24;
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;

  h1 {
    padding-top: 2rem;
    margin-bottom: 1rem;
  }
`;

export const RecipeContainer = styled.div`
  overflow: auto;
  max-height: 58vh;

  li {
    list-style: none;
  }
`;

export const Recipe = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 340px;
  padding-top: 0.5rem;

  div {
    display: flex;
    align-items: center;

    img {
      width: 42px;
    }
  }

  p {
    font-size: 1.3rem;
    line-height: 2rem;
    padding-top: 12px;
    margin-left: 15px;
    width: 250px;
  }
`;

export const EditeRecipeButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid black;
  }
`;
