import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  BackgroundOverlay,
  CloseButton,
  Container,
  Content,
  Input,
  InputContainer,
  Label,
  LabelDescription,
  RangeInput,
  Rate,
  SaveButton,
  StarRating,
  TextArea,
  Title,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "../../../Login/styles";
import { AuthContext } from "../../../../context/AuthContext";
import { RecipesContext } from "../../../../context/RecipeContext";

const avaliacaoSchema = zod.object({
  note: zod.number().min(0, "A nota mínima é 0").max(5, "A nota máxima é 5"),
  title: zod.string().min(1, "O título é obrigatório"),
  feedback: zod.string().min(1, "A descrição é obrigatória"),
  createdBy: zod.object({
    id: zod.string(),
    name: zod.string(),
  }),
  recipeId: zod.string(),
});

type AvaliacaoFormData = zod.infer<typeof avaliacaoSchema>;

interface NewRecipeReviewProps {
  onClose: () => void;
  idRecipe: string;
}

export function NewRecipeReview({ onClose, idRecipe }: NewRecipeReviewProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useContext(AuthContext);
  const { createVote } = useContext(RecipesContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AvaliacaoFormData>({
    resolver: zodResolver(avaliacaoSchema),
    defaultValues: {
      title: "",
      note: 2.5,
      feedback: "",
      createdBy: {
        id: user?.id || "",
        name: user?.name || "",
      },
      recipeId: idRecipe,
    },
  });

  const rating = watch("note", 2.5);

  const onSubmit = (data: AvaliacaoFormData) => {
    createVote(data).then(() => handleClose());
  };

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const calculateFill = (index: number, rating: number) => {
    const currentFill = Math.max(0, (rating - index) * 100);
    return Math.min(currentFill, 100);
  };

  return (
    <>
      <BackgroundOverlay />
      <Container>
        <CloseButton onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>

        <Content>
          <Title>Avalie a Receita</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label htmlFor="title">Título da Avaliação:</Label>
              <Input type="text" {...register("title")} id="title" />
              <ErrorMessage>
                {errors.title && <span>{errors.title.message}</span>}
              </ErrorMessage>
            </InputContainer>

            <StarRating>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  style={{
                    color: `rgba(255, 215, 0, ${calculateFill(i + 0.5, rating) / 100})`,
                    stroke: "#ffd700",
                    strokeWidth: "30px",
                  }}
                />
              ))}
            </StarRating>
            <Rate>
              <Label htmlFor="note">Sua nota</Label>
              <RangeInput
                type="range"
                min="0"
                max="5"
                step="0.5"
                {...register("note", { valueAsNumber: true })}
                id="note"
              />
              <ErrorMessage>
                {errors.note && <span>{errors.note.message}</span>}
              </ErrorMessage>
            </Rate>

            <LabelDescription htmlFor="feedback">
              Descreva sua experiência:
            </LabelDescription>
            <TextArea {...register("feedback")} />
            <ErrorMessage>
              {errors.feedback && <span>{errors.feedback.message}</span>}
            </ErrorMessage>

            <SaveButton type="submit">Salvar Avaliação</SaveButton>
          </form>
        </Content>
      </Container>
    </>
  );
}
