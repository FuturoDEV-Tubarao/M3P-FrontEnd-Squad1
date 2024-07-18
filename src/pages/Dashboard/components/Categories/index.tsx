import semglutem from "../../../../assets/sem-gluten.png";
import { CategoriesContainer, CategoriesGrid, CategoryButton, CategoryCard, CategoryImage, CategoryOverlay, CategoryTitle, Title } from "./styles";


export function Categories() {
    const categories = [
        {
          title: "Prato Principal",
          image: semglutem,
          alt: "Um prato com legumes e carne",
        },
        {
          title: "Aperitivos",
          image: semglutem,
          alt: "Uma tigela de aperitivos com frutas e nozes",
        },
        {
          title: "Bebidas",
          image: semglutem,
          alt: "Uma tábua com maçãs verdes e ervas",
        },
        {
          title: "Café da Manhã",
          image: semglutem,
          alt: "Uma tigela de salada com abacate e tomates",
        },
      ];
    
    
      return (
        <CategoriesContainer>
          <Title>Categorias Populares</Title>
          <CategoriesGrid>
            {categories.map((category, index) => (
              <CategoryCard key={index}>
                <CategoryImage src="category.image" alt="category.alt" />
                <CategoryOverlay>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryButton>
                    Todas as Receitas <i className="fas fa-arrow-right"></i>
                  </CategoryButton>
                </CategoryOverlay>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesContainer>
      );
    
}