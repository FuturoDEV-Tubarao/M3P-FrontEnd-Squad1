import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import {
  Badge,
  Button,
  Card,
  Content,
  Description,
  Header,
  Image,
  Meta,
  RecipeContainer,
  StarRating,
  Title,
  VoteButton,
} from "./styles";
import { useContext } from "react";
import { RecipesContext } from "../../../../context/RecipeContext";
// import { AuthContext } from "../../../../context/AuthContext";
// import { useContext } from "react";
import ImagemReceita from "../../../../assets/ImagemReceita.jpg";
import { AuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Votes } from "../../../../components/Votes";

export function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const { logado } = useContext(AuthContext);

  return (
    <RecipeContainer>
      {recipes.map((recipe) => (
        <Card key={recipe.id}>
          <Image src={ImagemReceita} alt={recipe.title} />
          <Content>
            <Header>
              <Badge>{recipe.recipeType}</Badge>
              <div>
                <StarRating>
                  {logado() && <Votes recipe={recipe} />}
                </StarRating>
              </div>
            </Header>
            <Title>{recipe.title}</Title>
            <Meta>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "1px" }} />
              {/* {recipe.author} */}Nome usuario
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginLeft: "55px", marginRight: "5px" }}
              />
              {recipe.lastModifiedDate}
            </Meta>
            <Description>{recipe.description}</Description>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button as={Link} to={`/recipe/${recipe.id}`}>
                Ver Receita
              </Button>
              {logado() && <VoteButton>Votar Receita</VoteButton>}
            </div>
          </Content>
        </Card>
      ))}
    </RecipeContainer>
  );
}
