import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;
  z-index: 1000;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1380px;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 575px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  color: #181f28;

  a {
    margin-right: 10px;
    color: inherit;
    text-decoration: none;
  }

  svg {
    font-size: 24px;
    cursor: pointer;
  }

  @media (max-width: 575px) {
    display: none; 
  }
`;

export const Logo = styled.div`
  img {
    height: 50px; 
  }
`;

export const StyledLink = styled.a`
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

  @media (max-width: 575px) {
    margin-left: 0;
    margin-top: 15px; 
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 575px) {
    flex-direction: row;
    gap: 15px; 
  }
`;