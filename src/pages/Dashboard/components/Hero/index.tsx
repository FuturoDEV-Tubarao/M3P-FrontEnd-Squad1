import { useContext } from "react";
import {
  Button,
  ButtonContainer,
  Content,
  Description,
  HeroContainer,
  SpecialButton,
  Title,
  Image,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/AuthContext";

export function Hero() {
  const { logado } = useContext(AuthContext);

  const scrollToRecipes = () => {
    const recipesSection = document.getElementById("ultimas-receitas");
    recipesSection && recipesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroContainer>
        <Content>
          <Title>The Foods That Fully Fill Your Heart</Title>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </Description>
          <ButtonContainer>
            <Button onClick={scrollToRecipes}>Escolher Receita</Button>
            {logado() && (
              <SpecialButton to="addrecipe" title="Nova Receita">
                <FontAwesomeIcon icon={faPen} />
                Cadastrar Receita
              </SpecialButton>
            )}
          </ButtonContainer>
        </Content>
        <Image src="src/assets/food.jpg" alt="Delicious Dish" />
      </HeroContainer>
    </>
  );
}
