import { useEffect, useState } from "react";
import { Star, StarContainer } from "../pages/RecipePage/components/RecipeReviewsList/styles";
import { faStar as faStarSolid, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

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
  voteAvg?: number;
  lastModifiedDate?: string;
  url?: string;
}

interface Vote {
  id?: string;
  note: number;
  feedback: string;
  recipeId: string;
}

interface RecipeReviewsProps {
  recipe: Recipe;
}

export function Votes({ recipe }: RecipeReviewsProps) {
  const [mediaAvaliacao, setMediaAvaliacao] = useState<number>(0);

  useEffect(() => {
    const result = recipe.voteAvg;

    if (result) {
      setMediaAvaliacao(result);
    }
  }, [recipe.voteAvg]);

  const renderStars = (note: number): JSX.Element[] => {
    const fullStars = Math.floor(note);
    const halfStar = note % 1 !== 0; 

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} icon={faStarSolid} />);
      } else if (halfStar && i === fullStars) {
        stars.push(<Star key={i} icon={faStarHalfAlt} />);
      } else {
        stars.push(<Star key={i} icon={faStarRegular} />);
      }
    }
    return stars;
  };

  return (
    <StarContainer>
      {renderStars(mediaAvaliacao)}
    </StarContainer>
  );
}
