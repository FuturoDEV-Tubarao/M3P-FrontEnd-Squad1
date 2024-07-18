import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const RecipeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 32px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  margin: 6px 25px;
  width: 360px;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Content = styled.div`
  padding: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;

export const Badge = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  backgroun-color: #f4d03f;
`;

export const Star = styled(FontAwesomeIcon)`
  color: ${(props) => (props.fill ? "#f4d03f" : "#ccc")};
  font-size: ${(props) => props.size || "18px"};
`;

export const Title = styled.h2`
  font-size: 25px;
  font-weight: light;
  margin: 15px 0;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
  font-size: 17px;
  color: #666;
  margin-top: 8px;
`;

export const Description = styled.p`
  margin: 18px 0;
  font-size: 16px;
  color: #666;
`;

export const Button = styled(NavLink)`
  background-color: #ffca28;
  color: black;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
  width: calc(50% - 7.5px);
  text-align: center;
  font-weight: light;
  text-decoration: none;
  &:first-child {
    margin-right: 15px;
  }
`;

export const VoteButton = styled.button`
  background-color: #ffca28;
  color: black;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
  width: calc(50% - 7.5px);
  text-align: center;
  font-weight: light;
  text-decoration: none;
  &:first-child {
    margin-right: 15px;
  }
  animation: ${pulse} 1s infinite;
  background-color: #4caf50; // Different background for voting
  color: white;
`;
