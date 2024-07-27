import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 1220px;
  gap: 81px;
  margin: auto;
  padding: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    padding: 20px; // Menor padding para telas menores
  }
`;

export const ReviewsSection = styled.div`
  flex: 1;
  padding-right: 50px;

  @media (max-width: 767px) {
    padding-right: 0px; // Reduz o padding à direita para dispositivos móveis
  }
`;

export const MainReviewsSection = styled.div`
  flex: 2;
  padding-left: 50px;

  @media (max-width: 767px) {
    padding-left: 0px; // Reduz o padding à esquerda para dispositivos móveis
  }
`;

export const SectionTitle = styled.h2`
  font-size: 27px;
  font-weight: bold;
  margin-top: 10px;
`;

export const CustomerReviewsTitle = styled(SectionTitle)`
  margin-bottom: 20px;
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fbbf24;
  margin-bottom: 4px;
`;

export const VoteContent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

export const VoteContainer = styled.div`
  margin: 12px 2px;

  p {
    margin-top: 12px;
  }
`;

export const VoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

export const Star = styled(FontAwesomeIcon)`
  margin-right: 2px;
`;

export const ReviewText = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
  display: inline;
`;

export const ProgressBarContainer = styled.div`
  margin-top: 16px;
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

export const ProgressBarLabel = styled.span`
  color: #2b9a31;
  font-size: 0.875rem;
  font-weight: bold;
`;

export const ProgressBarTrack = styled.div`
  flex-grow: 1;
  height: 8px;
  background-color: #e5e7eb;
  margin-left: 8px;
  position: relative;
`;

interface ProgressBarFillProps {
  width: string;
}

export const ProgressBarFill = styled.div<ProgressBarFillProps>`
  height: 100%;
  background-color: #fbbf24;
  width: ${(props) => props.width};
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Button = styled.button`
  height: 44px;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background-color: #fbbf24;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
  &:hover {
    background-color: #2b9a31;
    color: white;
  }
  svg {
    margin-right: 10px;
  }
`;

export const ReviewItem = styled.div`
  margin-bottom: 1.5rem;
`;

export const ReviewAuthor = styled.h3`
  font-weight: bold;
`;

export const Divider = styled.hr`
  margin-top: 24px;
  border-top: 1px solid #e2e8f0;
`;

export const ProductReviewPrompt = styled.p`
  margin: 16px 0;
  font-size: 0.875rem;
`;
