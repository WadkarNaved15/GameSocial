import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to access UserContext easily
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info: { id, name, email, avatar, etc. }
  const [loading, setLoading] = useState(true); // To track loading state
  const [token, setToken] = useState(null); // Optional auth token

  // Load user from localStorage or async call on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  // Login function
  const login = (userData) => {
    setUser(userData);
    console.log(userData,"userData");
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
