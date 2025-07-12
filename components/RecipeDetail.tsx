
import React from 'react';
import type { Recipe } from '../types';
import TimerIcon from './icons/TimerIcon';
import UsersIcon from './icons/UsersIcon';
import ChefHatIcon from './icons/ChefHatIcon';

interface RecipeDetailProps {
  recipe: Recipe | null;
}

const WelcomePlaceholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
    <ChefHatIcon className="h-24 w-24 mb-4 text-slate-300" />
    <h2 className="text-2xl font-bold font-playfair text-slate-700">Entdecken Sie Ihr nächstes Lieblingsgericht</h2>
    <p className="mt-2 max-w-md">
      Geben Sie eine Zutat, eine Küche oder eine Idee in die Suchleiste ein, und lassen Sie unsere KI köstliche Rezepte für Sie zaubern.
    </p>
  </div>
);

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  if (!recipe) {
    return <WelcomePlaceholder />;
  }

  const imageUrl = `https://picsum.photos/seed/${recipe.id}/800/600`;

  return (
    <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold font-playfair text-slate-800">{recipe.recipeName}</h1>
        <p className="mt-3 text-slate-600 text-lg">{recipe.description}</p>
        
        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-orange-50 p-4 rounded-lg">
            <TimerIcon className="h-6 w-6 mx-auto text-orange-500 mb-2"/>
            <p className="font-semibold text-slate-700">Vorbereitung</p>
            <p className="text-slate-600">{recipe.prepTime}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <TimerIcon className="h-6 w-6 mx-auto text-orange-500 mb-2"/>
            <p className="font-semibold text-slate-700">Kochzeit</p>
            <p className="text-slate-600">{recipe.cookTime}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <UsersIcon className="h-6 w-6 mx-auto text-orange-500 mb-2"/>
            <p className="font-semibold text-slate-700">Portionen</p>
            <p className="text-slate-600">{recipe.servings}</p>
          </div>
        </div>
        
        <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg my-6">
          <img src={imageUrl} alt={recipe.recipeName} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-4">Zutaten</h2>
                <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-3 mt-1">&#10003;</span>
                        <span className="text-slate-700">{ingredient}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-4">Anleitung</h2>
                <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4">{index + 1}</span>
                        <p className="text-slate-700 pt-1">{step}</p>
                    </li>
                ))}
                </ol>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
