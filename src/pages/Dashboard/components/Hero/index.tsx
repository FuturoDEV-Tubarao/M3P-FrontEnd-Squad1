import { useContext, useRef } from "react";
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
import { LatestRecipes } from "../LatestRecipes";

export function Hero() {
  const { logado } = useContext(AuthContext);
  const recipesRef = useRef(null);

  const scrollToRecipes = () => {
    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Elemento com referência 'recipesRef' não encontrado.");
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
              <SpecialButton to="addrecipe" title="Nova Receita">
                <FontAwesomeIcon icon={faPen} />
                Cadastrar Receita
              </SpecialButton>
            )}
          </ButtonContainer>
        </Content>
        <Image
          src="src/assets/Hero-Hamburguer.webp"
          alt="Delicioso Hamburguer Labfood"
        />
      </HeroContainer>
      <LatestRecipes recipesRef={recipesRef} />
    </>
  );
}
