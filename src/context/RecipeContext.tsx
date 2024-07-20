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

interface RecipesContextType {
  recipes: Recipe[];
  updateRecipe: (id: string, updatedRecipe: Recipe) => Promise<void>;
  createRecipe: (data: Recipe) => Promise<void>;
  createVote: (data: Vote) => Promise<void>;
  // getRecipeById: (id: string) => Promise<Recipe | null>;
  fetchRecipeById: (id: string) => Promise<Recipe | null>;


}

interface RecipesContextProviderProps {
  children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextType);

export function RecipesContextProvider({ children }: RecipesContextProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const token = localStorage.getItem('token');

  const createRecipe = async (data: Recipe) => {
    try {
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
  

  const createVote = async (data : Vote) => {
    try {
      console.log(data)
      const response = await api.post("/api/labfoods/v1/vote", data,  {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });

      if(response.data && response.status === 200) {
        alert("Voto cadastrado com sucesso");
      } else {
        alert("Não foi possível cadastrar o voto");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar voto");
    }
  }

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

  const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
    try {
      const response = await api.get(`/api/labfoods/v1/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar a receita:", error);
      return null;
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
    <RecipesContext.Provider value={{ recipes, updateRecipe, createRecipe, createVote, fetchRecipeById   }}>
      {children}
    </RecipesContext.Provider>
  );
}
