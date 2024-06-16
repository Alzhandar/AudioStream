import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/Label';
import { Input } from './ui/Input';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
  }
  
  const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault();
      onLogin(email, password);
    };
  
    return (
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md mx-auto mt-8">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" variant="primary" size="large" className="w-full">Login</Button>
      </form>
    );
  };
  
  export default Login;