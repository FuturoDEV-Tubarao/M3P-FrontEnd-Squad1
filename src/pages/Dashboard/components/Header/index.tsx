import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <h1>Livro de Receitas Online</h1>
      <nav>
          <NavLink to="/" title="Home">
          <p>Home</p>
          </NavLink>
          <NavLink to="/dashboard" title="Dashboard">
          <p>Dashboard</p>
          </NavLink>
        </nav>
    </HeaderContainer>
  )
}