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
} from "./styles";
import ImagemReceita from "../../../../assets/ImagemReceita.jpg";

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
  lastModifiedDate?: string;
  url?: string;
  createdDate?: string;
  createdBy?: {
    name: string;
    id: string;
  };
}

interface Vote {
  note: number;
  feedback: string;
  recipeId: string;
}

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
            <Badge>{recipe.recipeType}</Badge>
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
          <Text>{recipe.description}</Text>
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
          <Image src={ImagemReceita} alt="Delicious Dish" />
        </ImageSection>
      </ContentContainer>
    </MainContainer>
  );
}
