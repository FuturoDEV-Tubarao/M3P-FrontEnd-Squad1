// Profile.tsx
import { useContext } from "react";
import { Header } from "../../components/Header";
import {
  ButtonGroup,
  ProfileContainer,
  ProfileInfos,
  StyledNavLink,
} from "./styles";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

export function Profile() {
  const { deleteUser } = useContext(UserContext);
  const { user, logado } = useContext(AuthContext);
  const currentPage = logado() ? "dashboard" : "home";

  const handleDelete = async () => {
    if (
      user &&
      window.confirm("Tem certeza de que deseja excluir sua conta?")
    ) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao tentar excluir o usuário");
      }
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
            <button onClick={handleDelete}>Excluir Conta</button>
          </ButtonGroup>
        </ProfileInfos>
      </div>
    </ProfileContainer>
  );
}
