
import { Header } from "../../components/Header";
import { ButtonGroup, ProfileContainer, ProfileInfos, StyledNavLink } from "./styles";

// interface ProfileProps {
//   name: string;
//   email: string;
// }

export function Profile() {
  return (
    <ProfileContainer>
      <div>
        <Header currentPage={"dashboard"} />
        <ProfileInfos>
          <img src="src\assets\user-icon.png" alt="" />
          <h1>João Silva</h1>
          <p>emailusuario@gmail.com</p>
          <ButtonGroup>
                <StyledNavLink to="/editProfile" title="UserForm">
                  Editar
                </StyledNavLink>
            <button>Excluir Conta</button>
          </ButtonGroup>
        </ProfileInfos>
      </div>
    </ProfileContainer>
  );
}
