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
import HeroHamburguer from "../../../../assets/Hero-Hamburguer.webp";

export function Hero() {
  const { logado } = useContext(AuthContext);

  const scrollToRecipes = () => {
    const recipesSection = document.getElementById("ultimas-receitas");
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Elemento com ID 'ultimas-receitas' não encontrado.");
    }
  };

  return (
    <>
      <HeroContainer>
        <Content>
          <Title>A Química Perfeita de Sabor e Saúde!</Title>
          <Description>
            Explore pratos deliciosos e saudáveis, todos sem glúten e sem
            lactose. Ideal para quem busca uma alimentação equilibrada sem abrir
            mão do sabor. Experimente receitas inovadoras e nutricionalmente
            ricas!
          </Description>
          <ButtonContainer>
            <Button onClick={scrollToRecipes}>Escolher Receita</Button>
            {logado() && (
              <SpecialButton to="/addrecipe" title="Nova Receita">
                <FontAwesomeIcon icon={faPen} />
                Cadastrar Receita
              </SpecialButton>
            )}
          </ButtonContainer>
        </Content>
        <Image src={HeroHamburguer} alt="Delicioso Hamburguer Labfood" />
      </HeroContainer>
    </>
  );
}
