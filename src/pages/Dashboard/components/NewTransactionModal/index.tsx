import * as Dialog from "@radix-ui/react-dialog";
import { FormControlLabel, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Content,
  Infos,
  Overlay,
  RecipeFormContainer,
  Title,
  CloseButton,
  HeaderWrapper,
  ButtonNewRecipe,
  Wrapper,
  ButtonDiv,
  Restrictions,
  ErroMessage,
  ContentRecipe,
  ButtonDelete,
} from "./styles";
import { useContext, useEffect } from "react";
import { X } from "phosphor-react";
import { RecipeContext } from "../../../../contexts/RecipeContext";
import { Header } from "../Header";

const newRecipeFormValidationSchema = zod.object({
  nameRecipe: zod.string().min(1, "Informe o nome da receita"),
  ingredients: zod.string().min(1, "Informe os ingredientes"),
  preparationInstructions: zod.string().min(1, "Informe o modo de preparo"),
  options: zod.object({
    lactose: zod.boolean(),
    gluten: zod.boolean(),
  }),
});

type NewRecipeFormData = zod.infer<typeof newRecipeFormValidationSchema>;
interface Recipe {
  id: string;
  nameRecipe: string;
  ingredients: string;
  preparationInstructions: string;
  options: {
    lactose: boolean;
    gluten: boolean;
  };
}

interface NewTransactionModalProps {
  recipe?: Recipe;
}

export function NewTransationModal({ recipe }: NewTransactionModalProps) {
  const { recipes, setRecipes } = useContext(RecipeContext);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewRecipeFormData>({
    resolver: zodResolver(newRecipeFormValidationSchema),
    defaultValues: {
      nameRecipe: recipe?.nameRecipe || "",
      ingredients: recipe?.ingredients || "",
      preparationInstructions: recipe?.preparationInstructions || "",
      options: {
        lactose: recipe?.options.lactose || false,
        gluten: recipe?.options.gluten || false,
      },
    },
  });

  function handleCreateOrUpdateRecipe(data: NewRecipeFormData) {
    const newRecipe: Recipe = {
      id: recipe ? recipe.id : String(new Date().getTime()),
      nameRecipe: data.nameRecipe,
      ingredients: data.ingredients,
      preparationInstructions: data.preparationInstructions,
      options: {
        lactose: data.options.lactose,
        gluten: data.options.gluten,
      },
    };

    if (recipe) {
      const updatedRecipes = recipes.map((r) =>
        r.id === recipe.id ? newRecipe : r
      );
      setRecipes(updatedRecipes);
    } else {
      setRecipes([...recipes, newRecipe]);
      reset();
    }

    const recipesFromStorage = JSON.parse(
      localStorage.getItem("recipes") || "[]"
    );
    const updatedRecipesStorage = recipe
      ? recipesFromStorage.map((r: Recipe) =>
          r.id === recipe.id ? newRecipe : r
        )
      : [...recipesFromStorage, newRecipe];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipesStorage));
  }
  function handleDeleteRecipe() {
    if (recipe) {
      const deletedRecipe = recipes.find((r) => r.id === recipe.id);
      const deletedRecipesFromStorage = JSON.parse(
        localStorage.getItem("deletedRecipes") || "[]"
      );
      localStorage.setItem(
        "deletedRecipes",
        JSON.stringify([...deletedRecipesFromStorage, deletedRecipe])
      );

      const updatedRecipes = recipes.filter((r) => r.id !== recipe.id);
      setRecipes(updatedRecipes);

      const recipesFromStorage = JSON.parse(
        localStorage.getItem("recipes") || "[]"
      );
      const updatedRecipesStorage = recipesFromStorage.filter(
        (r: Recipe) => r.id !== recipe.id
      );
      localStorage.setItem("recipes", JSON.stringify(updatedRecipesStorage));
    }
  }

  useEffect(() => {
    const recipesFromStorage = JSON.parse(
      localStorage.getItem("recipes") || "[]"
    );
    const deletedRecipesFromStorage = JSON.parse(
      localStorage.getItem("deletedRecipes") || "[]"
    );

    const activeRecipes = recipesFromStorage.filter(
      (recipe: { id: Recipe }) =>
        !deletedRecipesFromStorage.find(
          (deletedRecipe: { id: Recipe }) => deletedRecipe.id === recipe.id
        )
    );

    setRecipes(activeRecipes);
  }, []);

  function handleClose() {
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Content>
        <Wrapper>
          <CloseButton onClick={handleClose}>
            <X size={24} />
          </CloseButton>
          <Title>{recipe ? "Editar receita" : "Adicionar receita"}</Title>
          <RecipeFormContainer>
            <form onSubmit={handleSubmit(handleCreateOrUpdateRecipe)}>
              <Infos>
                <ContentRecipe>
                  <p>Nome</p>
                  <textarea id="nameRecipe" {...register("nameRecipe")} />
                </ContentRecipe>
                <ErroMessage>
                  {errors.nameRecipe && (
                    <span>{errors.nameRecipe.message}</span>
                  )}
                </ErroMessage>
              </Infos>
              <Infos>
                <ContentRecipe>
                  <p>Ingredientes</p>
                  <textarea id="ingredients" {...register("ingredients")} />
                </ContentRecipe>
                <ErroMessage>
                  {errors.ingredients && (
                    <span>{errors.ingredients.message}</span>
                  )}
                </ErroMessage>
              </Infos>
              <Infos>
                <ContentRecipe>
                  <p>Modo de preparo</p>
                  <textarea
                    id="preparationInstructions"
                    {...register("preparationInstructions")}
                  />
                </ContentRecipe>
                <ErroMessage>
                  {errors.preparationInstructions && (
                    <span>{errors.preparationInstructions.message}</span>
                  )}
                </ErroMessage>
              </Infos>
              <Infos>
                <Restrictions>
                  <p>Restrições</p>
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "247px",
                      justifyContent: "space-around",
                    }}
                  >
                    <Controller
                      name="options.lactose"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.checked);
                              }}
                              checked={field.value}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                              color="default"
                              indeterminate={false}
                            />
                          }
                          label={<span>Lactose</span>}
                        />
                      )}
                    />
                    <Controller
                      name="options.gluten"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.checked);
                              }}
                              checked={field.value}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                              color="default"
                              indeterminate={false}
                            />
                          }
                          label={
                            <span style={{ fontWeight: "bold" }}>Glúten</span>
                          }
                        />
                      )}
                    />
                  </FormGroup>
                </Restrictions>
              </Infos>
              <ButtonDiv>
                <ButtonNewRecipe type="submit">
                  {recipe ? "Editar" : "Inserir"}
                </ButtonNewRecipe>
                {recipe && (
                  <ButtonDelete onClick={handleDeleteRecipe}>
                    Excluir
                  </ButtonDelete>
                )}
              </ButtonDiv>
            </form>
            <img src="src\assets\panela-quente-128.png" alt="" />
          </RecipeFormContainer>
        </Wrapper>
      </Content>
    </Dialog.Portal>
  );
}

