import semglutem from "../../../../assets/sem-gluten.jpg";
import { CategoriesContainer, CategoriesGrid, CategoryButton, CategoryCard, CategoryImage, CategoryOverlay, CategoryTitle, Title } from "./styles";

enum RecipeType {
  MAIN_DISH = "MAIN_DISH",
  APPETIZERS = "APPETIZERS",
  DRINKS = "DRINKS",
  BREAKFAST = "BREAKFAST",
}

interface CategoriesProps {
  handleCategoryChange: (category: RecipeType) => void;
}

export function Categories({ handleCategoryChange }: CategoriesProps) {
  const categories = [
    {
      title: "Prato Principal",
      type: RecipeType.MAIN_DISH,
      image: semglutem,
      alt: "Um prato com legumes e carne",
    },
    {
      title: "Aperitivos",
      type: RecipeType.APPETIZERS,
      image: semglutem,
      alt: "Uma tigela de aperitivos com frutas e nozes",
    },
    {
      title: "Bebidas",
      type: RecipeType.DRINKS,
      image: semglutem,
      alt: "Uma tábua com maçãs verdes e ervas",
    },
    {
      title: "Café da Manhã",
      type: RecipeType.BREAKFAST,
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
            <CategoryImage src={category.image} alt={category.alt} />
            <CategoryOverlay>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryButton onClick={() => handleCategoryChange(category.type)}>
                Todas as Receitas <i className="fas fa-arrow-right"></i>
              </CategoryButton>
            </CategoryOverlay>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  );
}
