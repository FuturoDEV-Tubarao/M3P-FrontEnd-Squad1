import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { UserForm } from "../pages/Profile/components/UserForm";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { NewRecipe } from "../pages/Dashboard/components/NewRecipe";
import { EditRecipe } from "../pages/EditeRecipe";
import { AuthContextProvider } from "../context/AuthContext";
import { RecipePage } from "../pages/RecipePage";
import { RecipesContextProvider } from "../context/RecipeContext";
import { RegisterContextProvider } from "../context/RegisterContext";
// import { NewRecipeReview } from "../pages/RecipePage/components/NewRecipeReview";

const RotaPrivada = () => {
  const isLogado = localStorage.getItem("isLogado");

  return isLogado ? <Outlet /> : <Navigate to="/login" replace />;
};

export function Router() {
  return (
    <RegisterContextProvider>
    <AuthContextProvider>
      <RecipesContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addrecipe" element={<NewRecipe />} />
          <Route path="/editrecipe" element={<EditRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<UserForm />} />
          <Route  path="/recipe/:id" element={<RecipePage />} />
          {/* <Route path="/recipereview" element={<NewRecipeReview />} /> */}

          <Route element={<RotaPrivada />}>
            {/* adicionar as rotas privadas aqui, deixei elas fora para poder visualizar todas */}
          </Route>
        </Routes>
      </RecipesContextProvider>
    </AuthContextProvider>
    </RegisterContextProvider>
  );
}
