import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 1.2rem;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Ubuntu", sans-serif;

  nav {
    display: flex;
    justify-content: center;
    padding-top: 1.2rem;
    gap: 20px;
    font-size: 1rem;
  }

    a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    color: ${(props) => props.theme['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['green-500']};
    }

    &.active {
      color: red;
    }
  }
`;
