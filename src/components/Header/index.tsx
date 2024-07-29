import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  HeaderContainer,
  InnerContainer,
  Logo,
  SocialIcon,
  SocialMediaContainer,
  StyledNavLink,
} from "./styles";
import logoImage from "../../assets/logo.png";
import MenuContainer from "../MenuContainer";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface HeaderProps {
  currentPage: "home" | "dashboard";
}

export function Header({ currentPage }: HeaderProps) {
  const { logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <InnerContainer>
        <SocialMediaContainer>
          <SocialIcon
            href="https://www.facebook.com/profile.php?id=61563525841775&sk=about"
            target="Facebook"
            rel="Canal Labfoods no Facebook"
          >
            <FaFacebookF />
          </SocialIcon>
          <SocialIcon
            href="https://www.instagram.com/labfoods.rs/"
            target="Instagram"
            rel="Canal Labfoods no Instagram"
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://x.com/LabFoods93523"
            target="X"
            rel="Canal Labfoods no X"
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon
            href="https://www.youtube.com/@LabFoods"
            target="Youtube"
            rel="Canal Labfoods no Youtube"
          >
            <FaYoutube />
          </SocialIcon>
        </SocialMediaContainer>
        <Logo>
          <a href="https://www.labfoods.com.br">
            <img src={logoImage} alt="Labfoods Logo" />
          </a>
        </Logo>
        <MenuContainer currentPage={currentPage}>
          <nav>
            {currentPage === "home" && (
              <>
                <StyledNavLink to="/" title="Home">
                  <p>Home</p>
                </StyledNavLink>
                <StyledNavLink to="/login" title="Login">
                  <p>Login</p>
                </StyledNavLink>
                <StyledNavLink to="/register" title="Register">
                  <p>Cadastre-se</p>
                </StyledNavLink>
              </>
            )}
            {currentPage === "dashboard" && (
              <>
                <StyledNavLink to="/" title="Dashboard">
                  <p>Home</p>
                </StyledNavLink>
                <StyledNavLink to="/profile" title="Profile">
                  <p>Perfil</p>
                </StyledNavLink>
                <StyledNavLink to="/" onClick={() => logout()}>
                  <p>Logout</p>
                </StyledNavLink>
              </>
            )}
          </nav>
        </MenuContainer>
      </InnerContainer>
    </HeaderContainer>
  );
}
