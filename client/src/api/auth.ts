interface AuthResponse {
    token: string;
  }
  
  export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      return null;
    }
  
    return await response.json();
  };
  
  export const register = async (username: string, email: string, password: string): Promise<AuthResponse | null> => {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    if (!response.ok) {
      return null;
    }
  
    return await response.json();
  };