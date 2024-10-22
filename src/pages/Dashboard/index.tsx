import { useContext } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { Hero } from "./components/Hero";
import { LatestRecipes } from "./components/LatestRecipes";

export function Dashboard() {
  const { logado } = useContext(AuthContext);
  const currentPage = logado() ? "dashboard" : "home";

  return (
    <>
      <Header currentPage={currentPage} />
      <Hero />
      <LatestRecipes />
    </>
  );
}
