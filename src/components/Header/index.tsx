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
            href="https://www.facebook.com/SouManoelF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </SocialIcon>
          <SocialIcon
            href="https://www.instagram.com/manoelcavenati/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon
            href="http://www.youtube.com/@manoelcavenati"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </SocialIcon>
        </SocialMediaContainer>
        <Logo>
          <a href="https://www.labfoods.com">
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
                <StyledNavLink to="/login" onClick={() => logout()}>
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
