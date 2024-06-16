import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for songs or artists..."
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary ml-2">Search</button>
    </form>
  );
};

export default SearchBar;
