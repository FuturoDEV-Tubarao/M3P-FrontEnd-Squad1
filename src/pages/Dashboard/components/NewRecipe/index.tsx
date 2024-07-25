import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  MainContainer,
  Container,
  TextContainer,
  FormContainer,
  FieldContainer,
  Label,
  Input,
  TextArea,
  RadioInput,
  ImageContainer,
  Image,
  Restrictions,
  DietType,
  LabelCheckbox,
  LabelRadio,
  RadioDiv,
  ButtoContainer,
  ErrorText,
  Title,
  Heading,
} from "./styles";
import backgroundImage from "../../../../assets/fundo-cadastro.jpg";
import { Header } from "../../../../components/Header";
import { RecipesContext } from "../../../../context/RecipeContext";
import { useContext } from "react";

enum RecipeType {
  MAIN_DISH = "MAIN_DISH",
  APPETIZERS = "APPETIZERS",
  DRINKS = "DRINKS",
  BREAKFAST = "BREAKFAST",
}

const newRecipeSchema = zod.object({
  title: zod
    .string()
    .min(1, "Informe o título da receita"),
  description: zod
    .string()
    .min(1, "Informe a descrição da receita")
    .max(255, "A descrição não pode ter mais de 255 caracteres"),
  ingredients: zod
    .string()
    .min(1, "Informe os ingredientes")
    .max(255, "Os ingredientes não podem ter mais de 255 caracteres"),
  preparationTime: zod
    .string()
    .min(1, "Informe um tempo de preparo"),
  preparationMethod: zod
    .string()
    .min(1, "Informe o modo de preparo")
    .max(255, "O modo de preparo não pode ter mais de 255 caracteres"),
  recipeType: zod.nativeEnum(RecipeType, {
    required_error: "Informe uma categoria",
  }),
  glutenFree: zod.boolean(),
  lactoseFree: zod.boolean(),
  origin: zod
    .string()
    .min(1, "Informe o país de origem"),
  url: zod
    .string()
    .min(1, "Informe uma URL")
    .max(255, "A URL não pode ter mais de 255 caracteres"),
});
type NewRecipeFormData = zod.infer<typeof newRecipeSchema>;

export function NewRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecipeFormData>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: "",
      preparationTime: "",
      preparationMethod: "",
      recipeType: RecipeType.MAIN_DISH,
      glutenFree: false,
      lactoseFree: false,
      origin: "",
      url: "",
    },
  });

  const { createRecipe } = useContext(RecipesContext);

  return (
    <>
      <Header currentPage={"dashboard"} />
      <MainContainer>
        <Container>
          <TextContainer>
            <Title>Cadastrar Receita</Title>
            <Heading>Quanto mais receitas, mais momentos Incríveis!</Heading>
          </TextContainer>
            <FormContainer onSubmit={handleSubmit(createRecipe)}>
              <FieldContainer>
                <Label>Título:</Label>
                <Input {...register("title")} />
              </FieldContainer>
                {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
              <FieldContainer>
                <Label>Descrição:</Label>
                <Input {...register("description")} />
              </FieldContainer>
                {errors.description && (
                  <ErrorText>{errors.description.message}</ErrorText>
                )}
              <FieldContainer>
                <Label>Ingredientes:</Label>
                <TextArea {...register("ingredients")} />
              </FieldContainer>
                {errors.ingredients && (
                  <ErrorText>{errors.ingredients.message}</ErrorText>
                )}
              <FieldContainer>
                <Label>Tempo de Preparo:</Label>
                <Input type="string" {...register("preparationTime")} />
              </FieldContainer>
                {errors.preparationTime && (
                  <ErrorText>{errors.preparationTime.message}</ErrorText>
                )}
              <FieldContainer>
                <Label>Modo de Preparo:</Label>
                <TextArea {...register("preparationMethod")} />
              </FieldContainer>
                {errors.preparationMethod && (
                  <ErrorText>{errors.preparationMethod.message}</ErrorText>
                )}
              <FieldContainer>
                <Label>Tipo de Receita:</Label>
                <div>
                  <RadioDiv>
                    <LabelRadio>
                      <RadioInput
                        type="radio"
                        value="MAIN_DISH"
                        {...register("recipeType")}
                      />{" "}
                      Prato Principal
                    </LabelRadio>
                    <LabelRadio>
                      <RadioInput
                        type="radio"
                        value="APPETIZERS"
                        {...register("recipeType")}
                      />{" "}
                      Aperitivo
                    </LabelRadio>
                  </RadioDiv>
                  <RadioDiv>
                    <LabelRadio>
                      <RadioInput
                        type="radio"
                        value="DRINKS"
                        {...register("recipeType")}
                      />{" "}
                      Bebidas
                    </LabelRadio>
                    <LabelRadio>
                      <RadioInput
                        type="radio"
                        value="BREAKFAST"
                        {...register("recipeType")}
                      />{" "}
                      Café da Manhã
                    </LabelRadio>
                  </RadioDiv>
                </div>
              </FieldContainer>
              <Restrictions>
                <Label>Tipo de Dieta:</Label>
                <DietType>
                    <LabelCheckbox>Sem Lactose:
                    <Input type="checkbox" {...register("lactoseFree")} />
                    </LabelCheckbox>
                    <LabelCheckbox>Sem Glúten:
                    <Input type="checkbox" {...register("glutenFree")} />
                    </LabelCheckbox>
                </DietType>
              </Restrictions>
              <FieldContainer>
                <Label>País de Origem:</Label>
                <Input {...register("origin")} />
              </FieldContainer>
                {errors.origin && <ErrorText>{errors.origin.message}</ErrorText>}
              <FieldContainer>
                <Label>URL da Imagem:</Label>
                <Input {...register("url")} />
              </FieldContainer>
                {errors.url && <ErrorText>{errors.url.message}</ErrorText>}
              <ButtoContainer>
                <button type="submit">Inserir Receita</button>
              </ButtoContainer>
            </FormContainer>
          <ImageContainer>
            <Image src={backgroundImage} alt="Background" />
          </ImageContainer>
        </Container>
      </MainContainer>
    </>
  );
}
