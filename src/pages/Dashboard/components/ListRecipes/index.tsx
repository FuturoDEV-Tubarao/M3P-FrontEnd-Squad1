import { NewTransationModal } from "../NewTransactionModal";
import {
  EditeRecipeButton,
  ListContainer,
  Recipe,
  RecipeContainer,
} from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
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

export function ListRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <ListContainer>
      <h1>Receitas Cadastradas:</h1>
      <RecipeContainer>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Recipe>
              <div>
                <img src="src\assets\panela-quente.png" alt="" />
                <p>{recipe.nameRecipe}</p>
              </div>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <EditeRecipeButton type="button" title="Informações">
                    <img src="src\assets\icone-de-informacoes.png" alt="" />
                  </EditeRecipeButton>
                </Dialog.Trigger>
                <NewTransationModal recipe={recipe} />
              </Dialog.Root>
            </Recipe>
          </li>
        ))}
      </RecipeContainer>
    </ListContainer>
  );
}
