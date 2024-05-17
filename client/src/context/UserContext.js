import React, { createContext, useState, useContext } from "react";

const UserContext = createContext({
  username: null,
  email: null,
  password: null,
  isAuthenticated: false,
  setUsername: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setAuthenticated: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = (userData, token) => {
    setUsername(userData.username);
    setEmail(userData.email);
    setPassword(userData.password); 
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setEmail(null);
    setPassword(null);
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        email,
        password,
        isAuthenticated,
        setUsername,
        setEmail,
        setPassword,
        setAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
