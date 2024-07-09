import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from "react";
import { RecipeContext } from "./RecipeContext";

interface CheckboxState {
  semLeite: boolean;
  semGluten: boolean;
  todos: boolean;
}


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

type CheckboxAction = (keyof CheckboxState)[];

interface FilterRecipeContextType {
  selectedCheckboxes: CheckboxAction;
  setSelectedCheckboxes: Dispatch<SetStateAction<CheckboxAction>>;
  setFilteredRecipes: Dispatch<SetStateAction<Recipe[]>>;
  recipes: Recipe[];
  filteredRecipes: Recipe[];
}


interface FilterRecipeProvideProps {
  children: ReactNode;
}

export const FilterRecipeContext = createContext({} as FilterRecipeContextType);

export function FilterRecipeProvider({ children }: FilterRecipeProvideProps) {
  
  const { recipes } = useContext(RecipeContext);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<(keyof CheckboxState)[]>(["todos"]);

  return (
    <FilterRecipeContext.Provider value={{ recipes, setFilteredRecipes, selectedCheckboxes, filteredRecipes, setSelectedCheckboxes }}>
      {children}
    </FilterRecipeContext.Provider>
  );
}