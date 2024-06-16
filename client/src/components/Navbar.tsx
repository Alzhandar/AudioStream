import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/profile">Профиль</Link>
        </li>
        <li>
          <Link to="/songs">Песни</Link>
        </li>
        <li>
          <Link to="/favorites">Избранное</Link>
        </li>
        <li>
          <Link to="/artists">Исполнители</Link>
        </li>
        <li>
          <Link to="/create-artist">Создать исполнителя</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
