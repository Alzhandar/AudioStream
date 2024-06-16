import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Song {
  _id: string;
  title: string;
  artist: string;
  filePath: string;
}

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('/api/songs');
      const data = await response.json();
      setSongs(data);
    };

    fetchSongs();
  }, []);

  const handlePlay = (filePath: string) => {
    const audio = new Audio(filePath);
    audio.play();
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      {songs.length === 0 ? (
        <div>No songs available</div>
      ) : (
        <div className="grid gap-4">
          {songs.map((song) => (
            <div key={song._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{song.title} - {song.artist}</p>
              </div>
              <Button variant="ghost" size="small" onClick={() => handlePlay(song.filePath)}>Play</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;
