/*import { createContext, useState } from "react";

// Cria o contexto
export const FilterContext = createContext();

// Provedor do contexto
export function FilterProvider({ children }) {
  const [filtros, setFiltros] = useState({
    ordenacao: "preco-asc",
    menuVisivel: false,
  });

  const atualizarFiltro = (novosFiltros) => {
    setFiltros((filtrosAtuais) => ({
      ...filtrosAtuais,
      ...novosFiltros,
    }));
  };

  return (
    <FilterContext.Provider value={{ filtros, atualizarFiltro }}>
      {children}
    </FilterContext.Provider>
  );
}
*/
/*
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [ordenacao, setOrdenacao] = useState("preco-asc");

  return (
    <FilterContext.Provider value={{ ordenacao, setOrdenacao }}>
      {children}
    </FilterContext.Provider>
  );
};
*/
////////////////////////////////////

import { createContext, useState, useEffect } from "react";

// Crie o contexto
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [ordenacao, setOrdenacao] = useState(() => {
    // Tenta buscar do localStorage ao inicializar
    return localStorage.getItem('ordenacao') || "preco-asc";
  });

  // Efeito para salvar a ordenação no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('ordenacao', ordenacao);
  }, [ordenacao]);

  return (
    <FilterContext.Provider value={{ ordenacao, setOrdenacao }}>
      {children}
    </FilterContext.Provider>
  );
};
