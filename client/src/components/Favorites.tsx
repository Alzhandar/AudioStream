import React, { useEffect, useState } from 'react';

interface Song {
  _id: string;
  title: string;
  artist: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Song[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Ошибка при получении избранных песен:', error);
    }
  };

  const handleRemoveFavorite = async (songId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/favorites/${songId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setFavorites(favorites.filter(song => song._id !== songId));
      }
    } catch (error) {
      console.error('Ошибка при удалении из избранных:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Избранные Песни</h2>
      {favorites.map(song => (
        <div key={song._id} className="p-2">
          <p>{song.title} - {song.artist}</p>
          <button onClick={() => handleRemoveFavorite(song._id)} className="btn btn-sm">Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
