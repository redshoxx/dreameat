
import React, { useState, useCallback, useMemo } from 'react';
import type { Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import LoadingSpinner from './components/LoadingSpinner';
import ChefHatIcon from './components/icons/ChefHatIcon';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setSelectedRecipeId(null);
    try {
      const results = await generateRecipes(query);
      if (results && results.length > 0) {
        setRecipes(results);
        setSelectedRecipeId(results[0].id);
      } else {
        setError("Keine Rezepte gefunden. Versuchen Sie eine andere Suche.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
  };

  const selectedRecipe = useMemo(() => {
    return recipes.find(recipe => recipe.id === selectedRecipeId) || null;
  }, [recipes, selectedRecipeId]);
  
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-slate-50 text-slate-800">
      <main className="max-w-7xl mx-auto h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 flex-grow min-h-0">
          {/* Left Panel */}
          <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 flex flex-col p-6 bg-slate-50/50">
            <header className="flex items-center gap-3 mb-6">
              <ChefHatIcon className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold font-playfair">Rezept Genie</h1>
            </header>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <div className="mt-6 flex-grow overflow-y-auto pr-2 space-y-3">
              {isLoading && !recipes.length && <LoadingSpinner />}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSelected={selectedRecipeId === recipe.id}
                  onSelect={handleSelectRecipe}
                />
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-8 lg:col-span-9 p-8 flex-grow overflow-hidden relative">
            {isLoading && !selectedRecipe && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            <RecipeDetail recipe={selectedRecipe} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
