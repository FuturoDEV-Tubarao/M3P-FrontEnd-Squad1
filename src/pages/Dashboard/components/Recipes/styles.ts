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

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  width: 360px;
  margin-top: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Content = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const Badge = styled.span`
  background-color: #62ae1e;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 15px;
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
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  color: #666;
  margin-top: 8px;

  div {
    display: flex;
    gap: 6px;
  }
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
  margin-bottom: 10px;
  cursor: pointer;
  width: calc(50% - 7.5px);
  text-align: center;

  font-size: 17px;
  text-decoration: none;
  &:first-child {
    margin-right: 15px;
  }
  &:hover {
    background-color: #96d433;
    color: #ffffff;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
