import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ButtonContainer, HeaderContainer, InnerContainer, Logo, SocialIcon, SocialMediaContainer, StyledNavLink } from "./styles";
import logoImage from "../../../../assets/logo.png";

export function HeaderProfile() {
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
              <img src={logoImage} alt="Labfoods Logo" />
            </Logo>
            <ButtonContainer>
              <nav>
                <StyledNavLink to="/" title="Dashboard">
                  <p>Home</p>
                </StyledNavLink >
                <StyledNavLink to="/profile" title="Profile">
                  <p>Logout</p>
                </StyledNavLink >
              </nav>
            </ButtonContainer>
          </InnerContainer>
        </HeaderContainer>
      );
}