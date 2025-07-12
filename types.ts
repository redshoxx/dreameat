
export interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  imagePrompt: string;
}
