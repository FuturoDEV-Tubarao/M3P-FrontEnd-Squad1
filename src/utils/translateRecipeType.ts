enum RecipeType {
  MAIN_DISH = "MAIN_DISH",
  APPETIZERS = "APPETIZERS",
  DRINKS = "DRINKS",
  BREAKFAST = "BREAKFAST",
}


export const translateRecipeType = (type: RecipeType): string => {
    switch (type) {
      case RecipeType.APPETIZERS:
        return "APERITIVOS";
      case RecipeType.DRINKS:
        return "BEBIDA";
      case RecipeType.MAIN_DISH:
        return "PRATO PRINCIPAL";
      case RecipeType.BREAKFAST:
        return "CAFÉ DA MANHÃ";
      default:
        return type;
    }
  };