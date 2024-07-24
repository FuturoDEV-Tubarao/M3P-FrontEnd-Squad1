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
import ImagemReceita from "../../../../assets/ImagemReceita.jpg";
import { Link } from "react-router-dom";
import { Votes } from "../../../../components/Votes";
import { translateRecipeType } from "../../../../utils/translateRecipeType";

enum RecipeType {
  MAIN_DISH = "MAIN_DISH",
  APPETIZERS = "APPETIZERS",
  DRINKS = "DRINKS",
  BREAKFAST = "BREAKFAST",
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
  createdDate?: string;
  url?: string;
  voteAvg?: number;
  createdBy?: {
    name: string;
    id: string;
  };
}

interface Vote {
  note: number;
  feedback: string;
  recipeId: string;
  createdBy: {
    name: string;
  };
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function Recipes({ recipe }: RecipeCardProps) {
  return (
    <Card key={recipe.id}>
      <Image src={ImagemReceita} alt={recipe.title} />
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
        <Buttons>
          <Button as={Link} to={`/recipe/${recipe.id}`}>
            Ver Receita
          </Button>
        </Buttons>
      </Content>
    </Card>
  );
}
