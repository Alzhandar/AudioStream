import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/Label';
import { Input } from './ui/Input';

interface RegisterProps {
  onRegister: (username: string, email: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md mx-auto mt-8">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" variant="primary" size="large" className="w-full">Register</Button>
    </form>
  );
};

export default Register;