import { useContext, useEffect, useState } from "react";
import { Checkbox, CheckboxContainer, Container, Filters, Title, TitleContainer } from "./styles";
import { RecipesContext } from "../../../../context/RecipeContext";
import { Recipes } from "../Recipes";
import { RecipeContainer } from "../Recipes/styles";
import api from "../../../../axios/axiosConfig";
import { Categories } from "../Categories";

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

export function LatestRecipes() {
  const { recipes } = useContext(RecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [glutenFree, setGlutenFree] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RecipeType | null>(null);
  const [showAll, setShowAll] = useState(true);

  const applyFilters = (recipes: Recipe[]) => {
    let filtered = recipes;

    if (showAll) {
      setFilteredRecipes(recipes);
      return;
    }

    if (glutenFree && lactoseFree) {
      filtered = filtered.filter(recipe => recipe.glutenFree && recipe.lactoseFree);
    } else if (glutenFree) {
      filtered = filtered.filter(recipe => recipe.glutenFree && !recipe.lactoseFree);
    } else if (lactoseFree) {
      filtered = filtered.filter(recipe => !recipe.glutenFree && recipe.lactoseFree);
    } else {
      filtered = recipes;
    }
  
    if (selectedCategory) {
      filtered = filtered.filter(recipe => recipe.recipeType === selectedCategory);
    }

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    applyFilters(recipes);
  }, [recipes, glutenFree, lactoseFree, selectedCategory, showAll]);

  const handleFilterChange = (filter: string) => {
    switch (filter) {
      case "glutenFree":
        setGlutenFree(!glutenFree);
        setShowAll(false);
        break;
      case "lactoseFree":
        setLactoseFree(!lactoseFree);
        setShowAll(false);
        break;
      case "all":
        setShowAll(!showAll);
        setGlutenFree(false);
        setLactoseFree(false);
        setSelectedCategory(null);
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (category: RecipeType) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  const [users, setUsers] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const resultado = await api.get("/api/labfoods/v1/dashboard/users/active");
      console.log(resultado.data);
      setUsers(resultado.data);
    }
    fetchData();
  }, []);

  return (
    <>
    <Categories handleCategoryChange={handleCategoryChange} />
    <Container>
      <TitleContainer>
        <div>
          <Title>Últimas Receitas</Title>
          <p>Usuários Ativos: {users}</p>
        </div>
        <Filters>
        <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={showAll}
              onChange={() => handleFilterChange("all")}
            />
            Todas
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={glutenFree}
              onChange={() => handleFilterChange("glutenFree")}
            />
            Sem Glúten
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={lactoseFree}
              onChange={() => handleFilterChange("lactoseFree")}
            />
            Sem Lactose
          </CheckboxContainer>
        </Filters>
      </TitleContainer>
      <RecipeContainer>
        {filteredRecipes.map(recipe => (
          <Recipes key={recipe.id} recipe={recipe} />
        ))}
      </RecipeContainer>
    </Container>
    </>
  );
}
