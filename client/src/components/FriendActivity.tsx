import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const FriendActivity: React.FC = () => {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    socket.on('song_played', (data) => {
      setActivities(prevActivities => [...prevActivities, `${data.user} is playing ${data.songTitle}`]);
    });

    return () => {
      socket.off('song_played');
    };
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Friend Activity</h2>
      {activities.map((activity, index) => (
        <p key={index}>{activity}</p>
      ))}
    </div>
  );
};

export default FriendActivity;
