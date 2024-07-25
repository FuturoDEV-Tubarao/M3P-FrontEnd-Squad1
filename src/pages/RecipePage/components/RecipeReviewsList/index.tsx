import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  CustomerReviewsTitle,
  Divider,
  MainReviewsSection,
  ProductReviewPrompt,
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
import { Recipe, RecipesContext } from "../../../../context/RecipeContext";

interface RecipeReviewsProps {
  recipe: Recipe;
}

export function RecipeReviewsList({ recipe }: RecipeReviewsProps) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const { logado, user } = useContext(AuthContext);
  const { fetchRecipeById } = useContext(RecipesContext);

  const shouldShowReviewSection =
    logado() && user && recipe.createdBy && user.id !== recipe.createdBy.id;

  const openReviewPopup = () => {
    setShowReviewPopup(true);
  };

  const closeReviewPopup = async () => {
    setShowReviewPopup(false);
    const fetchedRecipe = await fetchRecipeById(recipe.id!);
    if (fetchedRecipe) {
      setUpdatedRecipe(fetchedRecipe);
    }
  };

  return (
    <Container>
      <ReviewsSection>
        <CustomerReviewsTitle>Avaliações de Clientes</CustomerReviewsTitle>
        <div>
          <Votes recipe={updatedRecipe} />
        </div>
        <ReviewText>
          {!!updatedRecipe.votes && updatedRecipe.votes.length} avaliações
          globais
        </ReviewText>
        <Divider />
        {shouldShowReviewSection && (
          <>
            <SectionTitle>Avalie este produto</SectionTitle>
            <ProductReviewPrompt>
              Compartilhe seus pensamentos com outros clientes
            </ProductReviewPrompt>
            <Button onClick={openReviewPopup}>
              <FontAwesomeIcon icon={faPen} />
              Escreva uma avaliação
            </Button>
          </>
        )}
      </ReviewsSection>
      <MainReviewsSection>
        <SectionTitle>Principais Avaliações</SectionTitle>
        <ReviewItem>
          <div>
            {!!updatedRecipe.votes &&
              updatedRecipe.votes.map((voto, index) => (
                <VoteContainer key={index}>
                  <ReviewAuthor>{voto.createdBy.name}</ReviewAuthor>
                  <p>{voto.feedback}</p>
                  <VoteContent>
                    <p>nota {voto.note}</p>
                    <Votes recipe={updatedRecipe} />
                  </VoteContent>
                  <Divider />
                </VoteContainer>
              ))}
          </div>
        </ReviewItem>
      </MainReviewsSection>
      {showReviewPopup && updatedRecipe.id && (
        <NewRecipeReview
          onClose={closeReviewPopup}
          idRecipe={updatedRecipe.id}
        />
      )}
    </Container>
  );
}
