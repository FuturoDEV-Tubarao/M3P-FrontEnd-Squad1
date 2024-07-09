import { ContentWrapper, GlobalStyle } from "./global";
import { RecipesProvider } from "./contexts/RecipeContext";
import { FilterRecipeProvider } from "./contexts/FilterRecipeContext";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <RecipesProvider>
      <FilterRecipeProvider>
        <BrowserRouter>
          <ContentWrapper>
            <Router />
            <GlobalStyle />
          </ContentWrapper>
        </BrowserRouter>
      </FilterRecipeProvider>
    </RecipesProvider>
  );
}

export default App;
