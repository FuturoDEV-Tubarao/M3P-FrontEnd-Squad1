import { useContext, useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxContainer,
  Container,
  Filters,
  Loading,
  NoResultsContainer,
  Title,
  TitleContainer,
} from "./styles";
import {
  Recipe,
  RecipesContext,
  RecipeType,
} from "../../../../context/RecipeContext";
import { Recipes } from "../Recipes";
import { RecipeContainer } from "../Recipes/styles";
import api from "../../../../axios/axiosConfig";
import { Categories } from "../Categories";
import { MagnifyingGlass } from "phosphor-react";
import { AuthContext } from "../../../../context/AuthContext";

export function LatestRecipes() {
  const { recipes, loading } = useContext(RecipesContext);
  const { user } = useContext(AuthContext);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [glutenFree, setGlutenFree] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RecipeType | null>(
    null
  );
  const [showAll, setShowAll] = useState(true);
  const [myRecipesOnly, setMyRecipesOnly] = useState(false);

  const applyFilters = (recipes: Recipe[]) => {
    let filtered = recipes;

    if (showAll) {
      filtered = recipes;
    } else {
      if (glutenFree && lactoseFree) {
        filtered = filtered.filter(
          (recipe) => recipe.glutenFree && recipe.lactoseFree
        );
      }
      if (glutenFree && !lactoseFree) {
        filtered = filtered.filter(
          (recipe) => recipe.glutenFree && !recipe.lactoseFree
        );
      }
      if (lactoseFree && !glutenFree) {
        filtered = filtered.filter(
          (recipe) => recipe.lactoseFree && !recipe.glutenFree
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (recipe) => recipe.recipeType === selectedCategory
        );
      }

      if (myRecipesOnly && user) {
        filtered = filtered.filter(
          (recipe) => recipe.createdBy?.id === user.id
        );
      }
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdDate || "").getTime();
      const dateB = new Date(b.createdDate || "").getTime();
      return dateB - dateA;
    });

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    applyFilters(recipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    recipes,
    glutenFree,
    lactoseFree,
    selectedCategory,
    showAll,
    myRecipesOnly,
    user,
  ]);

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
        setMyRecipesOnly(false);
        break;
      case "myRecipes":
        setMyRecipesOnly(!myRecipesOnly);
        setShowAll(false);
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
      const resultado = await api.get(
        "/api/labfoods/v1/dashboard/users/active"
      );
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
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={myRecipesOnly}
                onChange={() => handleFilterChange("myRecipes")}
              />
              Minhas Receitas
            </CheckboxContainer>
          </Filters>
        </TitleContainer>
        {loading ? (
          <Loading>
            <MagnifyingGlass size={32} />
            Buscando Receitas...
          </Loading>
        ) : filteredRecipes.length === 0 ? (
          <NoResultsContainer>
            <p>Não há receitas disponíveis para os filtros selecionados.</p>
          </NoResultsContainer>
        ) : (
          <RecipeContainer>
            {filteredRecipes.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </RecipeContainer>
        )}
      </Container>
    </>
  );
}
