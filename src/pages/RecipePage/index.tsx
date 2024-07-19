import { useContext } from "react";
import { Header } from "../../components/Header";
import { RecipeContent } from "./components/RecipeContent";
import { AuthContext } from "../../context/AuthContext";
// import { RecipeHeader } from "./components/RecipeHeader";

export function RecipePage() {
  const { logado } = useContext(AuthContext);
  const currentPage = logado() ? "dashboard" : "home";
  return (
    <>
      <Header currentPage={currentPage} />
      <RecipeContent />
    </>
  );
}
