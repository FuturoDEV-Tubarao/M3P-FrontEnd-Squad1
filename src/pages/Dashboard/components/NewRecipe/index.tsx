import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { MainContainer, Container, TextContainer, Title, Heading, FormContainer, FieldContainer, Label, Input, TextArea, RadioInput, Button, ImageContainer, Image, Restrictions } from './styles';
import backgroundImage from "../../../../assets/fundo-cadastro.jpg";
import { Header } from '../../../../components/Header';
import { RecipesContext } from '../../../../context/RecipeContext';
import { useContext } from 'react';


enum RecipeType {
  MAIN_DISH = 'MAIN_DISH',
  APPETIZERS = 'APPETIZERS',
  DRINKS = 'DRINKS',
  BREAKFAST = 'BREAKFAST',
}


const newRecipeSchema = zod.object({
  title: zod.string().min(1, "Informe o título da receita"),
  description: zod.string().min(1, "Informe a descrição da receita"),
  ingredients: zod.string().min(1, "Informe os ingredientes"),
  preparationTime: zod.string().min(1, "Informe uma preparação válida"),
  preparationMethod: zod.string().min(1, "Informe o modo de preparo"),
  recipeType: zod.nativeEnum(RecipeType, { required_error: "Informe uma categoria" }),
  glutenFree: zod.boolean(),
  lactoseFree: zod.boolean(),
  origin: zod.string().min(1, "Informe o país de origem"),
  url: zod.string().min(1, "Informe uma URL válida"),
});

type NewRecipeFormData = zod.infer<typeof newRecipeSchema>;

export function NewRecipe() {
  const { register, handleSubmit, formState: { errors } } = useForm<NewRecipeFormData>({
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
      <Header currentPage={'dashboard'}/>
      <MainContainer>
        <Container>
          <TextContainer>
            <Title>Cadastrar Receita</Title>
            <Heading>Quanto mais receitas, mais momentos Incríveis!</Heading>
          </TextContainer>
          <FormContainer>
            <form onSubmit={handleSubmit(createRecipe)}>
              <FieldContainer>
                <Label>Título:</Label>
                <Input {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>Descrição:</Label>
                <Input {...register('description')} />
                {errors.description && <span>{errors.description.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>Ingredientes:</Label>
                <TextArea {...register('ingredients')} />
                {errors.ingredients && <span>{errors.ingredients.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>Tempo de <br/>Preparo:</Label>
                <Input type="string" {...register('preparationTime')} />
                {errors.preparationTime && <span>{errors.preparationTime.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>Modo de <br/>Preparo:</Label>
                <TextArea {...register('preparationMethod')} />
                {errors.preparationMethod && <span>{errors.preparationMethod.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>Tipo de<br/>Receita:</Label>
                <div>
                  <Label>
                    <RadioInput type="radio" value="MAIN_DISH" {...register('recipeType')} /> Prato Principal
                  </Label>
                  <Label>
                    <RadioInput type="radio" value="APPETIZERS" {...register('recipeType')} /> Aperitivo
                  </Label>
                  <Label>
                    <RadioInput type="radio" value="DRINKS" {...register('recipeType')} /> Bebidas
                  </Label>
                  <Label>
                    <RadioInput type="radio" value="BREAKFAST" {...register('recipeType')} /> Café da Manhã
                  </Label>
                </div>
                {errors.recipeType && <span>{errors.recipeType.message}</span>}
              </FieldContainer>
              <Restrictions>
              <Label>Tipo de<br/>Dieta:</Label>
                <div>
                  <Label>Sem Glúten:</Label>
                  <Input type="checkbox" {...register('glutenFree')} />
                  {errors.glutenFree && <span>{errors.glutenFree.message}</span>}
                </div>
                <div>
                  <Label>Sem Lactose:</Label>
                  <Input type="checkbox" {...register('lactoseFree')} />
                  {errors.lactoseFree && <span>{errors.lactoseFree.message}</span>}
                </div>
              </Restrictions>
              <FieldContainer>
                <Label>País de <br/>Origem:</Label>
                <Input {...register('origin')} />
                {errors.origin && <span>{errors.origin.message}</span>}
              </FieldContainer>
              <FieldContainer>
                <Label>URL da Imagem:</Label>
                <Input {...register('url')} />
                {errors.url && <span>{errors.url.message}</span>}
              </FieldContainer>
              <Button type="submit">Inserir Receita</Button>
            </form>
          </FormContainer>
          <ImageContainer>
            <Image src={backgroundImage} alt="Background" />
          </ImageContainer>
        </Container>
      </MainContainer>
    </>
  );
}
