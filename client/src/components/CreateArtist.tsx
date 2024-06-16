import React, { useState } from 'react';

const CreateArtist: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({ name, bio, photoUrl })
      });
      if (!response.ok) {
        throw new Error('Failed to create artist');
      }
      alert('Artist created successfully');
      setName('');
      setBio('');
      setPhotoUrl('');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <input type="text" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
      <button type="submit" className="btn">Create Artist</button>
    </form>
  );
};

export default CreateArtist;
