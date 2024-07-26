// src/components/RecipeHeader.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Badge,
  BadgeAndRatingContainer,
  ContentContainer,
  DetailsContainer,
  ImageSection,
  MainContainer,
  RatingContainer,
  ShareContainer,
  TextSection,
  Title,
  Image,
  Text,
  UserDetails,
  Divider,
} from "./styles";

import {
  faFlag,
  faClock,
  faUser,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Votes } from "../../../../components/Votes";
import { translateRecipeType } from "../../../../utils/translateRecipeType";
import { Recipe } from "../../../../context/RecipeContext";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <MainContainer>
      <ContentContainer>
        <TextSection>
          <Title>{recipe.title}</Title>
          <BadgeAndRatingContainer>
            <Badge>{translateRecipeType(recipe.recipeType)}</Badge>
            <RatingContainer>
              <Votes recipe={recipe} />
            </RatingContainer>
          </BadgeAndRatingContainer>

          <DetailsContainer>
            <FontAwesomeIcon icon={faFlag} />
            <span>{recipe.origin}</span>
            <FontAwesomeIcon icon={faClock} />
            <span>{recipe.preparationTime}</span>
          </DetailsContainer>
          <Divider />
          <Text>{recipe.description}</Text>
          <Divider />
          <ShareContainer>
            <span>Compartilhar:</span>
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </ShareContainer>
          <Divider />
          <section>
            <UserDetails>
              <FontAwesomeIcon icon={faUser} />
              <span>{recipe.createdBy?.name}</span>
            </UserDetails>
            <UserDetails>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {recipe.createdDate
                ? new Date(recipe.createdDate).toLocaleDateString("pt-BR")
                : "Data não disponível"}
            </UserDetails>
          </section>
        </TextSection>
        <ImageSection>
          <Image src={recipe.url} alt="Delicious Dish" />
        </ImageSection>
      </ContentContainer>
    </MainContainer>
  );
}
