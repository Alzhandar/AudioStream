import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

interface Song {
  _id: string;
  title: string;
  artist: string;
  filePath: string;
}

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/songs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setSongs(data);
      setFilteredSongs(data);
    } catch (error) {
      console.error('Fetch songs error:', error);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredSongs(songs);
      return;
    }
    const filtered = songs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const handlePlay = (filePath: string) => {
    const audio = new Audio(filePath);
    audio.play();
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filteredSongs.map(song => (
        <div key={song._id} className="p-2">
          <p>{song.title} - {song.artist}</p>
          <button onClick={() => handlePlay(song.filePath)} className="btn btn-sm">Play</button>
        </div>
      ))}
    </div>
  );
};

export default SongList;