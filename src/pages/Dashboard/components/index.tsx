import { HomeContainer, Footer, NewRecipeButton } from "./styles";

import * as Dialog from "@radix-ui/react-dialog";

import { FilterRecipeContext } from "../../../contexts/FilterRecipeContext";
import { useContext } from "react";
import { FilterRecipes } from "./FilterRecipes";
import { NewTransationModal } from "./NewTransactionModal";
import { ListRecipes } from "./ListRecipes";
import { Header } from "./Header";

export function Dashboard() {
  const { filteredRecipes } = useContext(FilterRecipeContext);

  return (
    <div>
      <Header />
      <HomeContainer>
        <FilterRecipes />
        <ListRecipes recipes={filteredRecipes} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewRecipeButton type="button" title="Cadastrar">
              <img src="src\assets\add.png" alt="" />
            </NewRecipeButton>
          </Dialog.Trigger>
          <NewTransationModal />
        </Dialog.Root>
      </HomeContainer>
      <Footer>
        <img src="src\assets\logo-lab365.png" alt="" />
      </Footer>
    </div>
  );
}
