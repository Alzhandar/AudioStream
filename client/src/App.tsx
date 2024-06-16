import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import SongList from './components/SongList';
import Favorites from './components/Favorites';
import CreateArtist from './components/CreateArtist';
import ListArtists from './components/ListArtists';
import Navbar from './components/Navbar';
import { register, login } from './api/auth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';
import { Music2Icon, UserIcon, LogInIcon, LogOutIcon } from './components/icons';

const App: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const handleRegister = async (username: string, email: string, password: string) => {
    const result = await register(username, email, password);
    if (result) {
      console.log("Registered successfully:", result);
      setToken(result.token);
      localStorage.setItem('token', result.token);
    } else {
      console.log("Failed to register");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result) {
      console.log("Logged in successfully:", result);
      setToken(result.token);
      localStorage.setItem('token', result.token);
    } else {
      console.log("Failed to login");
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
        <header className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2 font-bold">
              <Music2Icon className="h-6 w-6" />
              Acme Music
            </a>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <a href="/profile" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  {!token && (
                    <>
                      <DropdownMenuItem>
                        <a href="/login" className="flex items-center gap-2">
                          <LogInIcon className="h-4 w-4" />
                          Login
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href="/register" className="flex items-center gap-2">
                          <LogInIcon className="h-4 w-4" />
                          Register
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                  {token && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button variant="ghost" size="icon" className="w-full justify-start" onClick={handleLogout}>
                          <LogOutIcon className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/register" element={!token ? <Register onRegister={handleRegister} /> : <Navigate replace to="/" />} />
              <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
              <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate replace to="/login" />} />
              <Route path="/songs" element={token ? <SongList /> : <Navigate replace to="/login" />} />
              <Route path="/favorites" element={token ? <Favorites /> : <Navigate replace to="/login" />} />
              <Route path="/artists" element={token ? <ListArtists /> : <Navigate replace to="/login" />} />
              <Route path="/create-artist" element={token ? <CreateArtist /> : <Navigate replace to="/login" />} />
              <Route path="/" element={token ? <Navigate replace to="/profile" /> : <Navigate replace to="/login" />} />
            </Routes>
          </div>
        </main>
        <footer className="bg-gray-100 py-4 dark:bg-gray-950 dark:text-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="text-sm">&copy; 2024 Acme Music. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <a href="/" className="text-sm hover:underline">
                  Terms
                </a>
                <a href="/" className="text-sm hover:underline">
                  Privacy
                </a>
                <a href="/" className="text-sm hover:underline">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
