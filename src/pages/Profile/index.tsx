// Profile.tsx
import { useContext, useState } from "react";
import { Header } from "../../components/Header";
import {
  ButtonGroup,
  Delete,
  ProfileContainer,
  ProfileInfos,
  StyledNavLink,
} from "./styles";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { RecipesContext } from "../../context/RecipeContext";

export function Profile() {
  const { deleteUser } = useContext(UserContext);
  const { user, logado } = useContext(AuthContext);
  const currentPage = logado() ? "dashboard" : "home";

  const { recipes, deleteAllRecipes } = useContext(RecipesContext);
  const [showDeleteRecipesButton, setShowDeleteRecipesButton] = useState(false);

  const handleDelete = async () => {
    if (user) {
      const userRecipes = recipes.filter(
        (recipe) => recipe.createdBy?.id === user.id
      );
      if (userRecipes.length > 0) {
        alert("Você precisa excluir suas receitas primeiro.");
        setShowDeleteRecipesButton(true);
        return;
      }

      if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
        try {
          await deleteUser(user.id);
        } catch (error) {
          console.error("Erro ao excluir usuário:", error);
          alert("Erro ao tentar excluir o usuário");
        }
      }
    }
  };

  const handleDeleteAllRecipes = async () => {
    try {
      await deleteAllRecipes();
      setShowDeleteRecipesButton(false);
    } catch (error) {
      console.error("Erro ao excluir receitas:", error);
      alert("Erro ao tentar excluir receitas");
    }
  };

  return (
    <ProfileContainer>
      <div>
        <Header currentPage={currentPage} />
        <ProfileInfos>
          <img src="src/assets/user-icon.png" alt="" />
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
          <ButtonGroup>
            <StyledNavLink
              to="/editProfile"
              state={{ user: user }}
              title="UserForm"
            >
              Editar
            </StyledNavLink>
            <Delete onClick={handleDelete}>Excluir Conta</Delete>
            {showDeleteRecipesButton && (
              <Delete onClick={handleDeleteAllRecipes}>Excluir Receitas</Delete>
            )}
          </ButtonGroup>
        </ProfileInfos>
      </div>
    </ProfileContainer>
  );
}
