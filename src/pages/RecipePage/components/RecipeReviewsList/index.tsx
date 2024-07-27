import { useContext, useEffect, useState } from "react";
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
  VoteHeader,
} from "./styles";
import { NewRecipeReview } from "../NewRecipeReview";
import { Votes } from "../../../../components/Votes";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";
import { Recipe, RecipesContext } from "../../../../context/RecipeContext";
import { Trash } from "phosphor-react";

interface RecipeReviewsProps {
  recipe: Recipe;
}

export function RecipeReviewsList({ recipe }: RecipeReviewsProps) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const { logado, user } = useContext(AuthContext);
  const { fetchRecipeById, deleteVote } = useContext(RecipesContext);

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

  useEffect(() => {
    setUpdatedRecipe(recipe);
  }, [recipe]);

  const handleDelete = async (voteId: string | undefined) => {
    if (!voteId) {
      alert("ID do voto não disponível");
      return;
    }

    try {
      await deleteVote(voteId);
      const updatedRecipeData = await fetchRecipeById(recipe.id!);
      if (updatedRecipeData) {
        setUpdatedRecipe(updatedRecipeData);
      }
    } catch (error) {
      alert("Erro ao tentar excluir o voto");
    }
  };

  return (
    <Container>
      <ReviewsSection>
        <CustomerReviewsTitle>Avaliações de Clientes</CustomerReviewsTitle>
        <div>
          {updatedRecipe.voteAvg !== undefined && (
            <Votes note={updatedRecipe.voteAvg} />
          )}
        </div>
        <ReviewText>
          {!!updatedRecipe.votes &&
            (updatedRecipe.votes.length === 1
              ? "1 avaliação global"
              : `${updatedRecipe.votes.length} avaliações globais`)}
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
                  <VoteHeader>
                    <ReviewAuthor>{voto.createdBy.name}</ReviewAuthor>
                    {user && user.id === voto.createdBy.id && voto.id && (
                      <button onClick={() => handleDelete(voto.id)}>
                        <Trash size={24} color="red" />
                      </button>
                    )}
                  </VoteHeader>
                  <p>{voto.feedback}</p>
                  <VoteContent>
                    <p>nota {voto.note}</p>
                    {voto.note !== undefined && <Votes note={voto.note} />}
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
