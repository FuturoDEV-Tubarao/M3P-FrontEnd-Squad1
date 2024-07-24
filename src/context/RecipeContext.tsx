import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

enum RecipeType {
  MAIN_DISH = "MAIN_DISH",
  APPETIZERS = "APPETIZERS",
  DRINKS = "DRINKS",
  BREAKFAST = "BREAKFAST",
}

export interface Recipe {
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
  voteAvg?: number;
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

interface RecipesContextType {
  recipes: Recipe[];
  updateRecipe: (id: string, updatedRecipe: Recipe) => Promise<void>;
  createRecipe: (data: Recipe) => Promise<void>;
  createVote: (data: Vote) => Promise<void>;
  fetchRecipeById: (id: string) => Promise<Recipe | null>;
  deleteRecipe: (id: string) => Promise<void>;
  deleteAllRecipes: () => Promise<void>;
}

interface RecipesContextProviderProps {
  children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextType);

export function RecipesContextProvider({
  children,
}: RecipesContextProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const createRecipe = async (data: Recipe) => {
    try {
      const response = await api.post("/api/labfoods/v1/recipe", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.status === 200) {
        alert("Receita cadastrada com sucesso");
        setRecipes((prevRecipes) => [...prevRecipes, response.data]);
        navigate("/");
      } else {
        alert("Não foi possível cadastrar a receita");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar receita");
    }
  };

  const createVote = async (data: Vote) => {
    try {
      const response = await api.post("/api/labfoods/v1/vote", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.status === 200) {
        alert("Voto cadastrado com sucesso");
      } else {
        alert("Não foi possível cadastrar o voto");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar voto");
    }
  };

  const updateRecipe = async (id: string, data: Recipe) => {
    try {
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await api.put(`/api/labfoods/v1/recipe/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.status === 200) {
        alert("Receita atualizada com sucesso");
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? response.data : recipe
          )
        );
      } else {
        alert("Não foi possível atualizar o usuário");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar atualizar receita");
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const response = await api.delete(`/api/labfoods/v1/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        alert("Receita excluída com sucesso!");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        navigate("/");
      }
    } catch (error) {
      alert("Erro ao tentar excluir receita");
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

  const deleteAllRecipes = async () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const response = await api.delete(`/api/labfoods/v1/recipe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        alert("Todas as receitas foram excluídas com sucesso!");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.createdBy?.id !== user?.id)
        );

        navigate("/profile");
      }
    } catch (error) {
      console.error("Erro ao excluir todas as receitas:", error);
      alert("Erro ao tentar excluir todas as receitas");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/api/labfoods/v1/recipe");
      setRecipes(response.data);
    }
    fetchData();
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        updateRecipe,
        createRecipe,
        createVote,
        fetchRecipeById,
        deleteRecipe,
        deleteAllRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
