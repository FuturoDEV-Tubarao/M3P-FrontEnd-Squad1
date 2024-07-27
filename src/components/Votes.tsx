import { useEffect, useState } from "react";
import {
  Star,
  StarContainer,
} from "../pages/RecipePage/components/RecipeReviewsList/styles";
import {
  faStar as faStarSolid,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface VotesProps {
  note: number;
}

export function Votes({ note }: VotesProps) {
  const actualNote = note ?? 0;
  const [mediaAvaliacao, setMediaAvaliacao] = useState<number>(0);

  useEffect(() => {
    if (actualNote !== undefined) {
      setMediaAvaliacao(actualNote);
    }
  }, [actualNote]);

  const renderStars = (note: number): JSX.Element[] => {
    const fullStars = Math.floor(note);
    const halfStar = note % 1 !== 0;

    const stars = [];
    for (let i = 0; i <= 4; i++) {
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

  return <StarContainer>{renderStars(mediaAvaliacao)}</StarContainer>;
}
