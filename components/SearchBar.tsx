
import React, { useState } from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('Gesundes Hühnchen Abendessen');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="z.B. Schnelle Pasta"
        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center disabled:bg-slate-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
