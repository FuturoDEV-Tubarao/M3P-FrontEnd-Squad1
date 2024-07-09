import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { ButtonContainer, HeaderContainer, InnerContainer, Logo, SocialMediaContainer, StyledLink } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <InnerContainer>
        <SocialMediaContainer>
          <a href="https://www.instagram.com/manoelcavenati/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/SouManoelF" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="http://www.youtube.com/@manoelcavenati" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </SocialMediaContainer>
        <Logo>
          <img src="src\assets\logo.png" alt="Labfoods Logo" />
        </Logo>
        <ButtonContainer>
          <StyledLink href="https://dunamisdigital.com.br/" target="_blank" rel="noopener noreferrer">
            Login
          </StyledLink>
          <StyledLink href="https://dunamisdigital.com.br/" target="_blank" rel="noopener noreferrer">
            Cadastre-se
          </StyledLink>
        </ButtonContainer>
      </InnerContainer>
    </HeaderContainer>
  );
};