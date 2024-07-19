import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../axios/axiosConfig";

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
  lastModifiedDate?: string;
  url?: string;
}

interface Vote {
  id: string;
  note: number;
  feedback: string;
  lastModifiedDate: string;
  recipeId: string;
}

interface RecipesContextType {
  recipes: Recipe[];
  updateRecipe: (id: string, updatedRecipe: Recipe) => Promise<void>;
  createRecipe: (data: Recipe) => Promise<void>;
}

interface RecipesContextProviderProps {
  children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextType);

export function RecipesContextProvider({ children }: RecipesContextProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const createRecipe = async (data: Recipe) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log(data);
      const response = await api.post("/api/labfoods/v1/recipe", data,  {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });

      if(response.data && response.status === 200) {
        alert("Receita cadastrada com sucesso");
      } else {
        alert("Não foi possível cadastrar a receita");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar receita");
    }
  };
  

  const updateRecipe = async (id: string, updatedRecipe: Recipe) => {
    try {
      const response = await api.put(`/api/labfoods/v1/recipe/${id}`, updatedRecipe);

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...response.data } : recipe
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/api/labfoods/v1/recipe');
      setRecipes(response.data);
    }
    fetchData();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, updateRecipe, createRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}
