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
  StyledSelect,
  CancelButton,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faClock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { RecipesContext } from "../../../../context/RecipeContext";
import { RecipeHeader } from "../RecipeHeader";
import { RecipeReviewsList } from "../RecipeReviewsList";
import { translateRecipeType } from "../../../../utils/translateRecipeType";

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
  createdDate?: string;
  url?: string;
  createdBy?: {
    name: string;
    id: string;
  };
}

interface Vote {
  note: number;
  feedback: string;
  recipeId: string;
  createdBy: {
    name: string;
  };
}

const recipeSchema = zod.object({
  title: zod.string().min(1, "Informe o título da receita"),
  description: zod.string().min(1, "Informe a descrição da receita"),
  ingredients: zod.string().min(1, "Informe os ingredientes"),
  preparationTime: zod.string().min(1, "Informe uma preparação válida"),
  preparationMethod: zod.string().min(1, "Informe o modo de preparo"),
  recipeType: zod.nativeEnum(RecipeType, {
    required_error: "Informe uma categoria",
  }),
  glutenFree: zod.boolean(),
  lactoseFree: zod.boolean(),
  origin: zod.string().min(1, "Informe o país de origem"),
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
      title: "",
      description: "",
      ingredients: "",
      preparationTime: "",
      preparationMethod: "",
      recipeType: RecipeType.MAIN_DISH,
      glutenFree: false,
      lactoseFree: false,
      origin: "",
    },
  });

  const { id } = useParams<{ id: string }>();
  const { recipes, updateRecipe, fetchRecipeById, deleteRecipe } = useContext(RecipesContext);
  const { logado, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find((recipe) => recipe.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      Object.keys(foundRecipe).forEach((key) =>
        setValue(
          key as keyof RecipeFormData,
          foundRecipe[key as keyof RecipeFormData]
        )
      );
    }
  }, [id, recipes, setValue]);

  useEffect(() => {
    if (recipe) {
      Object.keys(recipe).forEach((key) =>
        setValue(
          key as keyof RecipeFormData,
          recipe[key as keyof RecipeFormData]
        )
      );
    }
  }, [recipe, setValue]);

  if (!recipe) return <div>Loading...</div>;

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (!id) {
      console.error("Erro: ID da receita não encontrado");
      return;
    }

    try {
      await updateRecipe(id, { ...recipe, ...data });
      const updatedRecipe = await fetchRecipeById(id);
      if (updatedRecipe) {
        setRecipe(updatedRecipe);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
      alert("Erro ao atualizar a receita. Por favor, tente novamente.");
    }
  };

  const handleDelete = async () => {
    if (recipe && recipe.id && window.confirm("Tem certeza de que deseja excluir sua receita?")) {
      try {
        await deleteRecipe(recipe.id!);
      } catch (error) {
        console.error("Erro ao excluir receita:", error);
        alert("Erro ao tentar excluir a receita");
      }
    }
  };

  const changeRecipeSection =
    logado() && user && recipe.createdBy && user.id === recipe.createdBy.id;

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
                disabled={!isEditing || !logado()}
              />
              {errors.description && <span>{errors.description.message}</span>}
              <Subtitle>Ingredientes</Subtitle>
              <TextArea
                {...register("ingredients")}
                disabled={!isEditing || !logado()}
              />
              {errors.ingredients && <span>{errors.ingredients.message}</span>}
              <Subtitle>Modo de Preparo</Subtitle>
              <TextArea
                {...register("preparationMethod")}
                disabled={!isEditing || !logado()}
              />
              {errors.preparationMethod && (
                <span>{errors.preparationMethod.message}</span>
              )}
            </GeneralSection>
            <SpecialSection>
              <TittleMenu>Informações do Menu</TittleMenu>
              <List>
                <ListItem>
                  <FontAwesomeIcon icon={faFlag} color="#2b9a31" />
                  <Input
                    {...register("origin")}
                    disabled={!isEditing || !logado()}
                  />
                  {errors.origin && <span>{errors.origin.message}</span>}
                </ListItem>
                <ListItem>
                  <FontAwesomeIcon icon={faClock} color="#2b9a31" />
                  <Input
                    {...register("preparationTime")}
                    disabled={!isEditing || !logado()}
                  />
                  {errors.preparationTime && (
                    <span>{errors.preparationTime.message}</span>
                  )}
                </ListItem>
              </List>
              <Subtitle>Categorias</Subtitle>
              <StyledSelect
                {...register("recipeType")}
                disabled={!isEditing || !logado()}
              >
                {Object.values(RecipeType).map((type) => (
                  <option key={type} value={type}>
                    {translateRecipeType(type)}
                  </option>
                ))}
              </StyledSelect>
              {errors.recipeType && <span>{errors.recipeType.message}</span>}
              <Subtitle>Tipo de Dieta</Subtitle>
              <List>
                <ListItem>
                  <Checkbox
                    {...register("glutenFree")}
                    disabled={!isEditing || !logado()}
                    defaultChecked={recipe.glutenFree}
                  />
                  <label htmlFor="glutenFree">Sem Glúten</label>
                </ListItem>
                <ListItem>
                  <Checkbox
                    {...register("lactoseFree")}
                    disabled={!isEditing || !logado()}
                    defaultChecked={recipe.lactoseFree}
                  />
                  <label htmlFor="lactoseFree">Sem Lactose</label>
                </ListItem>
              </List>
              <>
                {" "}
                {changeRecipeSection && (
                  <>
                    {!isEditing ? (
                      <SpecialButton
                        type="button"
                        onClick={() => setIsEditing(true)}
                      >
                        Alterar Receita
                      </SpecialButton>
                    ) : (
                      <>
                        <SpecialButton type="submit">Salvar</SpecialButton>
                        <CancelButton
                          type="button"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </CancelButton>
                      </>
                    )}
                    <DeleteButton
                      type="button"
                      onClick={handleDelete}
                    >
                      Excluir
                    </DeleteButton>
                  </>
                )}
              </>
            </SpecialSection>
          </Grid>
        </form>
      </Container>
      <RecipeReviewsList recipe={recipe} />
    </>
  );
}
