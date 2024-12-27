import React, { createContext, useState, useContext } from "react";

// Criação do contexto
const AuthContext = createContext();

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função para salvar o usuário após login ou cadastro
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Opcional: salvar no localStorage
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Checar se o usuário está logado (opcional)
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
