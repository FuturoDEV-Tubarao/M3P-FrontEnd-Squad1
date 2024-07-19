import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  border-radius: 10px;
`;

export const ProfileInfos = styled.div`
  margin: 5rem auto;
  background: #ccc;
  width: 470px;
  height: 348px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;

  h1 {
    font-size: 24px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

    button {
    padding: 0.50rem 0.9rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;

    &:first-child {
      background-color: #4caf50;

      a {
       text-decoration: none;
        color: #fff;

      }
    }
    
    &:hover {
      background-color: #81c784; /* Cor mais clara para hover */
    }

    &:last-child {
      background-color: #f44336;

    &:hover {
      background-color: #e57373; /* Cor mais clara para hover */
    }
  }
`;

export const StyledNavLink = styled(Link)`
  padding: 0.50rem 0.9rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  background-color: #4caf50;

  &:hover {
    background-color: #81c784; /* Cor mais clara para hover */
  }
`;