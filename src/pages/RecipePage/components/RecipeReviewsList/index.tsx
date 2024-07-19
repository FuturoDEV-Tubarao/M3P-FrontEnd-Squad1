import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Container,
  CustomerReviewsTitle,
  Divider,
  MainReviewsSection,
  ProductReviewPrompt,
  /*ProgressBar,
  ProgressBarContainer,
  ProgressBarFill,
  ProgressBarLabel,
  ProgressBarTrack,*/
  ReviewAuthor,
  ReviewItem,
  ReviewsSection,
  ReviewText,
  SectionTitle,
  VoteContainer,
  VoteContent,
} from "./styles";
import { NewRecipeReview } from "../NewRecipeReview";
import { Votes } from "../../../../components/Votes";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";


enum RecipeType {
  MAIN_DISH = 'MAIN_DISH',
  APPETIZERS = 'APPETIZERS',
  DRINKS = 'DRINKS',
  BREAKFAST = 'BREAKFAST',
}


interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string;
  preparationTime: string;
  preparationMethod: string;
  recipeType: RecipeType;
  glutenFree: boolean;
  lactoseFree: boolean;
  origin: string;
  votes?: Vote[];
  lastModifiedDate?: string;
  url?: string;
}
interface Vote {
  id: string;
  note: number;
  feedback: string;
  lastModifiedDate: string;
  recipeId: string;
}


interface RecipeReviewsProps {
  recipe: Recipe;
}


export function RecipeReviewsList({ recipe }: RecipeReviewsProps) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const openReviewPopup = () => {
    setShowReviewPopup(true);
  };

  const closeReviewPopup = () => {
    setShowReviewPopup(false);
  };

  const {logado, /*logout*/} = useContext(AuthContext);



  return (
    <Container>
      <ReviewsSection>
        <CustomerReviewsTitle>Avaliações de Clientes</CustomerReviewsTitle>
        <div>
          <Votes recipe={recipe} />
        </div>
        <ReviewText>{!!recipe.votes && recipe.votes.length} avaliações globais</ReviewText>

        {/* Barra de progresso dinâmica */}
        {/* <ProgressBarContainer>
          <ProgressBar>
            <ProgressBarLabel>5 estrelas</ProgressBarLabel>
            <ProgressBarTrack>
              <ProgressBarFill width={`${porcentagens[4]}%`} />
            </ProgressBarTrack>
            <ReviewText>{porcentagens[4].toFixed(1)}%</ReviewText>
          </ProgressBar>
          <ProgressBar>
            <ProgressBarLabel>4 estrelas</ProgressBarLabel>
            <ProgressBarTrack>
              <ProgressBarFill width={`${porcentagens[3]}%`} />
            </ProgressBarTrack>
            <ReviewText>{porcentagens[3].toFixed(1)}%</ReviewText>
          </ProgressBar>
          <ProgressBar>
            <ProgressBarLabel>3 estrelas</ProgressBarLabel>
            <ProgressBarTrack>
              <ProgressBarFill width={`${porcentagens[2]}%`} />
            </ProgressBarTrack>
            <ReviewText>{porcentagens[2].toFixed(1)}%</ReviewText>
          </ProgressBar>
          <ProgressBar>
            <ProgressBarLabel>2 estrelas</ProgressBarLabel>
            <ProgressBarTrack>
              <ProgressBarFill width={`${porcentagens[1]}%`} />
            </ProgressBarTrack>
            <ReviewText>{porcentagens[1].toFixed(1)}%</ReviewText>
          </ProgressBar>
          <ProgressBar>
            <ProgressBarLabel>1 estrela</ProgressBarLabel>
            <ProgressBarTrack>
              <ProgressBarFill width={`${porcentagens[0]}%`} />
            </ProgressBarTrack>
            <ReviewText>{porcentagens[0].toFixed(1)}%</ReviewText>
          </ProgressBar>
        </ProgressBarContainer> */}
        <Divider />
        <SectionTitle>Avalie este produto</SectionTitle>
        <ProductReviewPrompt>
          Compartilhe seus pensamentos com outros clientes
        </ProductReviewPrompt>
        {logado() && <Button onClick={openReviewPopup}>
          <FontAwesomeIcon icon={faPen} />
          Escreva uma avaliação
        </Button>}
      </ReviewsSection>
      <MainReviewsSection>
        <SectionTitle>Principais Avaliações</SectionTitle>
        <ReviewItem>
          <div>
            {!!recipe.votes && recipe.votes.map((voto) => (
              <VoteContainer key={voto.id}>
                <ReviewAuthor>Nome</ReviewAuthor>
                <p>{voto.feedback}</p>
                <VoteContent>
                  <p>nota {voto.note}</p>
                  <Votes recipe={recipe} />
                </VoteContent>
                <Divider />
              </VoteContainer>
            ))}
          </div>
        </ReviewItem>
      </MainReviewsSection>
      {showReviewPopup && <NewRecipeReview onClose={closeReviewPopup} />}
    </Container>
  );
}
