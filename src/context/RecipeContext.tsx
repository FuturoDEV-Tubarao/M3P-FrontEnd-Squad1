import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

export enum RecipeType {
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
  id?: string;
  note: number;
  feedback: string;
  recipeId: string;
  createdBy: {
    id?: string;
    name: string;
  };
}

interface RecipesContextType {
  recipes: Recipe[];
  loading: boolean;
  updateRecipe: (id: string, updatedRecipe: Recipe) => Promise<Recipe | null>;
  createRecipe: (data: Recipe) => Promise<void>;
  createVote: (data: Vote) => Promise<void>;
  deleteVote: (id: string) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
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
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === data.recipeId
              ? { ...recipe, votes: [...(recipe.votes || []), data] }
              : recipe
          )
        );
      } else {
        alert("Não foi possível cadastrar o voto");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar voto");
    }
  };

  const deleteVote = async (id: string) => {
    try {
      const response = await api.delete(`/api/labfoods/v1/vote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        alert("Voto excluído com sucesso!");
      }
    } catch (error) {
      alert("Erro ao tentar excluir receita");
    }
  };

  const updateRecipe = async (
    id: string,
    data: Recipe
  ): Promise<Recipe | null> => {
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
        return response.data;
      } else {
        alert("Não foi possível atualizar a receita");
        return null;
      }
    } catch (error) {
      console.error("Erro ao tentar atualizar receita:", error);
      alert("Erro ao tentar atualizar receita");
      return null;
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

      if (response.data) {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? response.data : recipe
          )
        );
        return response.data;
      } else {
        return null;
      }
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
      try {
        setLoading(true);
        const response = await api.get("/api/labfoods/v1/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Erro ao carregar as receitas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loading,
        updateRecipe,
        createRecipe,
        createVote,
        deleteVote,
        fetchRecipeById,
        deleteRecipe,
        deleteAllRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
