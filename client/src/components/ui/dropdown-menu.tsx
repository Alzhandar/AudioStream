import React from 'react';

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="dropdown-menu">
    {children}
  </div>
);

export const DropdownMenuTrigger: React.FC<{ asChild: boolean, children: React.ReactNode }> = ({ children }) => (
  <div className="dropdown-trigger">
    {children}
  </div>
);

export const DropdownMenuContent: React.FC<{ align: string, children: React.ReactNode }> = ({ children }) => (
  <div className="dropdown-content">
    {children}
  </div>
);

export const DropdownMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="dropdown-item">
    {children}
  </div>
);

export const DropdownMenuSeparator: React.FC = () => (
  <div className="dropdown-separator" />
);
