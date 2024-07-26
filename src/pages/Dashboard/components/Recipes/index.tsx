import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  Button,
  Card,
  Content,
  Description,
  Header,
  Image,
  Meta,
  StarRating,
  Title,
} from "./styles";

import { Link } from "react-router-dom";
import { Votes } from "../../../../components/Votes";
import { translateRecipeType } from "../../../../utils/translateRecipeType";
import { Recipe } from "../../../../context/RecipeContext";

interface RecipeCardProps {
  recipe: Recipe;
}

export function Recipes({ recipe }: RecipeCardProps) {
  return (
    <Card key={recipe.id}>
      <Image src={recipe.url} alt={recipe.title} />
      <Content>
        <Header>
          <Badge>{translateRecipeType(recipe.recipeType)}</Badge>
          <div>
            <StarRating>{<Votes recipe={recipe} />}</StarRating>
          </div>
        </Header>
        <Title>{recipe.title}</Title>
        <Meta>
          {recipe.createdBy && !!recipe.createdBy.name && (
            <div>
              <FontAwesomeIcon icon={faUser} />
              {recipe.createdBy.name}
            </div>
          )}
          <div>
            <FontAwesomeIcon icon={faCalendarAlt} />
            {recipe.createdDate
              ? new Date(recipe.createdDate).toLocaleDateString("pt-BR")
              : "Data não disponível"}
          </div>
        </Meta>
        <Description>{recipe.description}</Description>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button as={Link} to={`/recipe/${recipe.id}`}>
            Ver Receita
          </Button>
          {/* {logado() && <VoteButton>Votar Receita</VoteButton>} */}
        </div>
      </Content>
    </Card>
  );
}
