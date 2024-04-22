// AuthContext.js

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserDetails(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
