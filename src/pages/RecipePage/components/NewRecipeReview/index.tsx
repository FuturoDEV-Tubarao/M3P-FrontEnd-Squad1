import { useState } from "react";
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

// Define o esquema de validação
const avaliacaoSchema = zod.object({
  title: zod.string().min(1, "O título é obrigatório"),
  rating: zod
    .number()
    .min(2, "A nota mínima é 2")
    .max(5.9, "A nota máxima é 5.9"),
  review: zod.string().min(1, "A descrição é obrigatória"),
});

type AvaliacaoFormData = zod.infer<typeof avaliacaoSchema>;
interface NewRecipeReviewProps {
    onClose: () => void; // Define o tipo de prop onClose
  }
  
  export function NewRecipeReview({ onClose }: NewRecipeReviewProps) {
  const [isVisible, setIsVisible] = useState(true); // Definindo isVisible e setIsVisible

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AvaliacaoFormData>({
    resolver: zodResolver(avaliacaoSchema),
    defaultValues: {
      title: "",
      rating: 2,
      review: "",
    },
  });


  const rating = watch("rating", 2); // Observa o valor de rating do formulário

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose(); // Chama a função onClose quando o pop-up é fechado
  };

  const calculateFill = (index: number, rating: number) => {
    const currentFill = Math.max(0, (rating - index) * 100);
    return Math.min(currentFill, 100);
  };

  const onSubmit = (data: AvaliacaoFormData) => {
    alert(
      `Título: ${data.title}, Avaliação: ${data.rating.toFixed(1)}, Comentário: ${data.review}`
    );
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
                    color: `rgba(255, 215, 0, ${calculateFill(i + 1, rating) / 100})`,
                    stroke: "#ffd700",
                    strokeWidth: "20px",
                  }}
                />
              ))}
            </StarRating>
            <Rate>
                <Label htmlFor="rating">Sua nota</Label>
                <RangeInput
                  type="range"
                  min="2"
                  max="5.9"
                  step="0.1"
                  {...register("rating")}
                  id="rating"
                />
                <ErrorMessage>
                  {errors.rating && <span>{errors.rating.message}</span>}
                </ErrorMessage>
            </Rate>

                <LabelDescription htmlFor="review">Descreva sua experiência:</LabelDescription>
                <TextArea {...register("review")} id="review" />
                <ErrorMessage>
                  {errors.review && <span>{errors.review.message}</span>}
                </ErrorMessage>

            <SaveButton type="submit">Salvar Avaliação</SaveButton>
          </form>
        </Content>
      </Container>
    </>
  );
}
