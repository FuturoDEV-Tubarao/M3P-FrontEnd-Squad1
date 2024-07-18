import { Button, ButtonContainer, Container, FieldContainer, FormContainer, Heading, Image, ImageContainer, Input, Label, MainContainer, RadioInput, TextArea, TextContainer, Title } from "./styles";
import backgroundImage from "../../assets/fundo-addrecipe.jpg";
import { Header } from "../../components/Header";

export function EditRecipe() {
    return (
        <div>
            <Header currentPage={"dashboard"} />
            <MainContainer>
              <Container>
                <TextContainer>
                  <Title>Atualizar Receita</Title>
                  <Heading>Vamos em busca do perfeito sabor!</Heading>
                </TextContainer>
                <FormContainer>
                  <FieldContainer>
                    <Label>Nome:</Label>
                    <Input />
                  </FieldContainer>
                  <FieldContainer>
                    <Label>Ingredientes:</Label>
                    <TextArea />
                  </FieldContainer>
                  <FieldContainer>
                    <Label>
                      Modo de <br></br>Preparo:
                    </Label>
                    <TextArea />
                  </FieldContainer>
                  <FieldContainer>
                    <Label>Restrições:</Label>
                    <div>
                      <Label>
                        <RadioInput type="radio" name="restrictions" /> Sem Lactose
                      </Label>
                      <Label>
                        <RadioInput type="radio" name="restrictions" /> Sem Glúten
                      </Label>
                    </div>
                  </FieldContainer>
                  <FieldContainer>
                    <Label>Categorias:</Label>
                    <div>
                      <Label>
                        <RadioInput type="radio" name="categories" /> Prato Principal
                      </Label>
                      <Label>
                        <RadioInput type="radio" name="categories" /> Aperitivo
                      </Label>
                      <br></br>
                      <Label>
                        <RadioInput type="radio" name="categories" /> Bebidas
                      </Label>
                      <Label>
                        <RadioInput type="radio" name="categories" /> Café da Manhã
                      </Label>
                    </div>
                  </FieldContainer>
                  <FieldContainer>
                    <Label>
                      URL da <br></br>Imagem:
                    </Label>
                    <Input />
                  </FieldContainer>
                  <ButtonContainer>
                    <Button>Alterar</Button>
                    <Button>Excluir</Button>
                  </ButtonContainer>
                </FormContainer>
                <ImageContainer>
                  <Image src={backgroundImage} alt="Background" />
                </ImageContainer>
              </Container>
            </MainContainer>
        </div>
      );
}