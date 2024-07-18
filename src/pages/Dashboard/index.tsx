import { useContext } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { Cards } from "./components/Cards";
import { Categories } from "./components/Categories";
import { Hero } from "./components/Hero";
import { LatestRecipes } from "./components/LatestRecipes";

export function Dashboard() {
  const { logado } = useContext(AuthContext);
  const currentPage = logado() ? "dashboard" : "home"; 

  return (
    <>
      <Header currentPage={currentPage} />
      <Hero />
      <Categories />
      <LatestRecipes />
      <Cards />
    </>
  );
}
