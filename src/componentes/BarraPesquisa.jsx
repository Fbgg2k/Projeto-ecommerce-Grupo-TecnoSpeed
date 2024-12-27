import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const BarraPesquisa = ({ onSearch, produtos, loading }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [resultados, setResultados] = useState([]); // Variável para armazenar os resultados da pesquisa
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Atualiza os resultados sempre que os produtos mudarem
  useEffect(() => {
    setResultados(produtos);
  }, [produtos]);

  const handleChange = (event) => {
    const valor = event.target.value;
    setTermoPesquisa(valor);
    setIsSearching(valor.length > 0);
    onSearch(valor); // Faz a busca ao alterar o termo de pesquisa
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setTermoPesquisa('');
      setIsSearching(false);
      onSearch(''); // Limpa a pesquisa
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && termoPesquisa.trim()) {
      navegarParaBusca();
    }
  };

  const navegarParaBusca = () => {
    setIsSearching(false);
    navigate(`/busca?termo=${termoPesquisa}`); // Adiciona o termo como query param
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para lidar com o clique no produto e redirecionar
  const handleProdutoClick = (id) => {
    setTermoPesquisa(''); // Limpa a barra de pesquisa
    setIsSearching(false); // Fecha a lista de resultados
    navigate(`/produto/${id}`); // Redireciona para a página do produto pelo ID
  };

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={termoPesquisa}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="p-2 pl-10 border border-gray-300 rounded-lg w-full"
      />
      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />

      {/* Exibição dos resultados */}
      {isSearching && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 mt-1 p-2">
          {loading && <p>Carregando...</p>}
          {resultados.length > 0 ? (
            <>
              {resultados.map((produto) => (
                <div
                  key={produto.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleProdutoClick(produto.id)}
                >
                  {produto.nome}
                </div>
              ))}
              {/* Botão "Ver mais" renderizado uma vez */}
              <div
                className="p-2 mt-2 text-center  text-black rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={navegarParaBusca}
              >
                Ver mais
              </div>
            </>
          ) : (
            termoPesquisa && !loading && <p className="text-gray-500">Produto não encontrado</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BarraPesquisa;
