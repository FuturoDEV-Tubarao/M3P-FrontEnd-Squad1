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
    const result = recipe.votes;

    if (result) {
      // Calcula a média de notas
      const totalNotas = result.length;
      const somaNotas = result.reduce(
        (acc: number, voto: { note: number }) => acc + voto.note,
        0
      );
      const mediaNotas = totalNotas > 0 ? somaNotas / totalNotas : 0;
      setMediaAvaliacao(mediaNotas);

      const counts = [0, 0, 0, 0, 0];
      result.forEach((voto: { note: number }) => {
        if (voto.note === 5) counts[4]++;
        else if (voto.note === 4) counts[3]++;
        else if (voto.note === 3) counts[2]++;
        else if (voto.note === 2) counts[1]++;
        else if (voto.note === 1) counts[0]++;
      });
    }
  }, [recipe.votes]);

  const renderStars = (note: number): JSX.Element[] => {
    const fullStars = Math.floor(note / 2);
    const halfStar = note % 2 === 1;

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
      {renderStars(mediaAvaliacao * 2)}{" "}
    </StarContainer>
  );
}