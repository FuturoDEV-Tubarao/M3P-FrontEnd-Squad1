import { ReactNode, createContext, useState } from "react";

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

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

interface RecipeProvideProps {
  children: ReactNode;
}

export const RecipeContext = createContext({} as RecipeContextType);

export function RecipesProvider({ children }: RecipeProvideProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}