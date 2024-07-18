import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f4;
  width: 100%;
  padding: 10px;
  z-index: 1000;
`;


export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;


  @media (max-width: 1200px) {
    max-width: 90%;
  }


  @media (max-width: 992px) {
    max-width: 90%;
  }


  @media (max-width: 768px) {
    flex-direction: column;
  }


  @media (max-width: 576px) {
    flex-direction: column;
    padding: 0 10px;
  }
`;


export const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  color: #181f28;


  @media (max-width: 768px) {
    display: none; // Hide social icons on tablets and below
  }
`;


export const SocialIcon = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  text-decoration: none;
  color: #f4f4f3;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #2c2f29;


  &:hover {
    background-color: #62ae1e;
  }


  svg {
    font-size: 15px;
  }
`;


export const Logo = styled.div`
  img {
    height: 70px;
  }
`;


export const StyledNavLink =  styled(NavLink)`
  background-color: #ffdf34;
  color: #181f28;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;


  &:hover {
    background-color: #62ae1e;
    color: #ffffff;
  }


  @media (max-width: 768px) {
    margin-top: 10px; // Add spacing on mobile
  }
`;


export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
`;