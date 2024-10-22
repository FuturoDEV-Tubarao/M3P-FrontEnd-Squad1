import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  Button,
  Buttons,
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
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

interface RecipeCardProps {
  recipe: Recipe;
}

export function Recipes({ recipe }: RecipeCardProps) {
  const { user } = useContext(AuthContext);
  return (
    <Card key={recipe.id}>
      <Image src={recipe.url} alt={recipe.title} />
      <Content>
        <Header>
          <Badge>{translateRecipeType(recipe.recipeType)}</Badge>
          <div>
            <StarRating>
              {recipe.voteAvg !== undefined && <Votes note={recipe.voteAvg} />}
            </StarRating>
          </div>
        </Header>
        <Title>{recipe.title}</Title>
        <Meta>
          {recipe.createdBy && !!recipe.createdBy.name && (
            <div>
              <FontAwesomeIcon icon={faUser} />
              {recipe.createdBy.id === user?.id
                ? user.name
                : recipe.createdBy.name}
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
        <Buttons>
          <Button as={Link} to={`/recipe/${recipe.id}`}>
            Ver Receita
          </Button>
        </Buttons>
      </Content>
    </Card>
  );
}
