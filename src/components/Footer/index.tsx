import { FooterContainer, FooterContent, Logo } from "./styles";
import Logo2 from "../../assets/Labfoos-Logo-2.webp";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo src={Logo2} alt="Labfoods Logo" />
      </FooterContent>
    </FooterContainer>
  );
}
