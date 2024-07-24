import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

export const ContentContainer = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  max-width: 1220px;
  margin: 0 10px;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const TextSection = styled.div`
  padding: 1rem;
  flex: 1;
  margin-bottom: 0.5rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 43px;
  color: black;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const BadgeAndRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 140px;
  @media (min-width: 768px) {
    gap: 300px;
  }
`;

export const Badge = styled.span`
  background-color: #2b9a31;
  border-botton: 2px;
  color: white;
  padding: 0.25rem 0.9rem;
  border-radius: 5px;
  font-size: 19px;
  font-weight: 100;
`;

export const RatingContainer = styled.div`
  color: #fbbf24;
  display: flex;
  align-items: center;
`;

export const Text = styled.p`
  color: #4b5563;
  margin: 3rem 0;
`;

export const DetailsContainer = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  margin-bottom: var(--details-text-margin-bottom, 1rem);
  color: var(--details-text-color, #2b9a31);

  span {
    font-size: var(--details-text-font-size, 20px);
    font-weight: var(--details-text-font-weight, normal);
    color: var(--details-color, black);
    &:first-of-type {
      margin-right: 25px;
    }
  }
`;

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

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 25px; // Espaçamento entre os botões
`;

export const Button = styled.button`
  background-color: #ffdf34;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: light;

  &:hover {
    background-color: #f2ca04;
  }

  svg {
    margin-right: 10px;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const SpecialButton = styled(Button)`
  animation: ${pulse} 1s infinite;
  background-color: #2b9a31; // Cor especial para este botão
  color: white;

  &:hover {
    background-color: #ffdf34; // Cor de hover especial
    color: black;
  }
`;

export const ShareContainer = styled.div`
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;

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
  }
  & > span {
    margin-right: 138px;
    @media (min-width: 768px) {
      margin-right: 300px;
    }
  }
`;

export const ImageSection = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`;
