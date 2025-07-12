
import React from 'react';
import type { Recipe } from '../types';
import TimerIcon from './icons/TimerIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, isSelected }) => {
  const imageUrl = `https://picsum.photos/seed/${recipe.id}/300/200`;

  return (
    <div
      onClick={() => onSelect(recipe.id)}
      className={`
        flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
        ${isSelected ? 'bg-orange-100 ring-2 ring-orange-500 shadow-md' : 'bg-white hover:bg-slate-100 hover:shadow-sm'}
      `}
    >
      <img src={imageUrl} alt={recipe.recipeName} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
      <div className="overflow-hidden">
        <h3 className="font-semibold text-slate-800 truncate">{recipe.recipeName}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <TimerIcon className="h-4 w-4" />
          <span>{recipe.prepTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
