import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Container,
  Grid,
  GeneralSection,
  SpecialSection,
  Title,
  Subtitle,
  TextArea,
  Input,
  List,
  ListItem,
  Checkbox,
  SpecialButton,
  TittleMenu,
  DeleteButton,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faClock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { RecipesContext } from "../../../../context/RecipeContext";
import { RecipeHeader } from "../RecipeHeader";
import { RecipeReviewsList } from "../RecipeReviewsList";


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
  // lastModifiedDate?: string;
  createdDate: string;
  url?: string;
  createdBy?: {
    name: string;
    id: string;
  }
}
interface Vote {
  note: number;
  feedback: string;
  recipeId: string;
  createdBy: {
    name: string;
  } 
}

const recipeSchema = zod.object({
  description: zod.string().min(1, "Informe a descrição da receita"),
  preparationMethod: zod.string().min(1, "Informe o modo de preparo"),
  ingredients: zod.string().min(1, "Informe os ingredientes"),
  origin: zod.string().min(1, "Informe o país de origem"),
  preparationTime: zod.string().min(1, "Informe um tempo de preparo válido"),
  selectedCategory: zod.string().min(1, "Informe uma categoria"),
  glutenFree: zod.boolean(),
  lactoseFree: zod.boolean(),
});

type RecipeFormData = zod.infer<typeof recipeSchema>;

export function RecipeContent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      description: "",
      preparationMethod: "",
      ingredients: "",
      origin: "Brasil",
      preparationTime: "30",
      selectedCategory: "",
      glutenFree: false,
      lactoseFree: false,
    },
  });

  const { id } = useParams<{ id: string}>();
  const { recipes, updateRecipe } = useContext(RecipesContext);
  const { logado } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const isLoggedIn = logado();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find((recipe) => recipe.id === id);
    console.log(foundRecipe)
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setValue("description", foundRecipe.description);
      setValue("preparationMethod", foundRecipe.preparationMethod);
      setValue("ingredients", foundRecipe.ingredients);
      setValue("origin", foundRecipe.origin);
      setValue("preparationTime", foundRecipe.preparationTime);
      setValue("selectedCategory", foundRecipe.recipeType);
      setValue("glutenFree", foundRecipe.glutenFree);
      setValue("lactoseFree", foundRecipe.lactoseFree);
    }
  }, [id, recipes, setValue]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

   const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (!id) {
      console.error("Erro: ID da receita não encontrado");
      return;
    }

    try {
      await updateRecipe(id, {
        ...recipe,
        ...data,
        preparationMethod: data.preparationMethod,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    console.log("excluir")
  };

  return (
    <>
      <RecipeHeader recipe={recipe} />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <GeneralSection>
              <Title>Descrição</Title>
              <TextArea
                {...register("description")}
                disabled={!isEditing || !isLoggedIn}
              />
              {errors.description && <span>{errors.description.message}</span>}
              <Subtitle>Ingredientes</Subtitle>
              <TextArea
                {...register("ingredients")}
                disabled={!isEditing || !isLoggedIn}
              />
              {errors.ingredients && <span>{errors.ingredients.message}</span>}

              <Subtitle>Modo de Preparo</Subtitle>
              <GeneralSection>
                <TextArea
                  {...register("preparationMethod")}
                  disabled={!isEditing || !isLoggedIn}
                />
              </GeneralSection>
            </GeneralSection>

            <SpecialSection>
              <TittleMenu>Informações do Menu</TittleMenu>
              <List>
                <ListItem>
                  <FontAwesomeIcon icon={faFlag} color="#2b9a31" />
                  <Input
                    {...register("origin")}
                    disabled={!isEditing || !isLoggedIn}
                  />
                  {errors.origin && <span>{errors.origin.message}</span>}
                </ListItem>
                <ListItem>
                  <FontAwesomeIcon icon={faClock} color="#2b9a31" />
                  <Input
                    {...register("preparationTime")}
                    disabled={!isEditing || !isLoggedIn}
                  />
                  {errors.preparationTime && (
                    <span>{errors.preparationTime.message}</span>
                  )}
                </ListItem>
              </List>

              <Subtitle>Categorias</Subtitle>
              <Checkbox
                {...register("selectedCategory")}
                disabled={!isEditing || !isLoggedIn}
              />
                <label htmlFor="glutenFree">{recipe.recipeType}</label>

              <Subtitle>Tipo de Dieta</Subtitle>
              <List>
                <ListItem>
                  <Checkbox
                    {...register("glutenFree")}
                    disabled={!isEditing || !isLoggedIn}
                  />
                  <label htmlFor="glutenFree">Sem Glúten</label>
                </ListItem>
                <ListItem>
                  <Checkbox
                    {...register("lactoseFree")}
                    disabled={!isEditing || !isLoggedIn}
                  />
                  <label htmlFor="lactoseFree">Sem Lactose</label>
                </ListItem>
              </List>

              {isLoggedIn && (
                <SpecialButton type="button" onClick={handleEditClick}>
                  {isEditing ? "Salvar" : "Alterar Receita"}
                </SpecialButton>
              )}
              {isLoggedIn && (
                <DeleteButton type="button" onClick={handleDeleteClick}>
                  Excluir
                </DeleteButton>
              )}
            </SpecialSection>
          </Grid>
        </form>
      </Container>
      <RecipeReviewsList recipe={recipe} />
    </>
  );
}