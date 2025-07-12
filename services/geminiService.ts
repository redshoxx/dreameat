
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "Name des Rezepts" },
    description: { type: Type.STRING, description: "Eine kurze, verlockende Beschreibung des Gerichts." },
    prepTime: { type: Type.STRING, description: "Vorbereitungszeit, z.B. '15 Minuten'" },
    cookTime: { type: Type.STRING, description: "Kochzeit, z.B. '30 Minuten'" },
    servings: { type: Type.STRING, description: "Anzahl der Portionen, z.B. '4 Portionen'" },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Liste der Zutaten mit Mengenangaben."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Schritt-für-Schritt-Anleitung für die Zubereitung."
    },
    imagePrompt: { type: Type.STRING, description: "Ein kurzer, beschreibender Prompt zur Generierung eines realistischen, appetitlichen Bildes für dieses Gericht. Beispiel: 'Ein dampfender Teller mit goldbraunem Lachsfilet auf einem Bett aus Quinoa, garniert mit frischem Dill und einer Zitronenscheibe, fotografiert im natürlichen Licht.'" }
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions", "imagePrompt"]
};

export const generateRecipes = async (prompt: string): Promise<Recipe[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generiere 3 einzigartige und köstliche Rezeptideen für: "${prompt}". Gib die Ergebnisse auf Deutsch zurück.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: recipeSchema,
          description: "Eine Liste von 3 Rezepten."
        },
      },
    });

    const jsonText = response.text.trim();
    const recipesData: Omit<Recipe, 'id'>[] = JSON.parse(jsonText);
    
    // Add a unique ID to each recipe
    const recipesWithIds: Recipe[] = recipesData.map(recipe => ({
      ...recipe,
      id: crypto.randomUUID()
    }));

    return recipesWithIds;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Fehler bei der Kommunikation mit der AI. Bitte versuchen Sie es später erneut.");
  }
};
