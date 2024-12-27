import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CardProduto from './CardProduto';
import api from '../services/api';

const ListaProdutos = () => {

  // Função para buscar os produtos da API
  async function getProdutos() {
    try {
      const response = await api.get('produtos/novidades'); // Faz a requisição para a API
      setProdutos(response.data.data); // Armazena os produtos no estado
      console.log(produtos);

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  // useEffect para chamar a função ao carregar o componente
  useEffect(() => {
    getProdutos(); // Chama a função para buscar os produtos ao montar o componente
  }, []); // [] significa que só será executado uma vez ao carregar o componente


  const [produtos, setProdutos] = useState([]); // Armazenar os produtos da API
  const [currentIndex, setCurrentIndex] = useState(0);
  const produtosPerPage = 4; // Exibir 4 produtos por vez


  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - produtosPerPage, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + produtosPerPage, produtos.length - 1)
    );
  };


  return (

    <div className="lg:mb-14 md:mb-6 sm:mb-0 mt-6">
      <div className="flex justify-center items-center h-full">
        <button
          onClick={handlePrevClick}
          className="p-2"
          disabled={currentIndex === 0}
        >
          <FaAngleLeft size={36} className="fill-customBlueRelease" /> {/*alterações do botão*/}
        </button>
        <div className="overflow-hidden flex-1 h-full">
          <div
            className="flex transition-transform duration-300 h-full"
            style={{
              transform: `translateX(-${(currentIndex / produtosPerPage) * 100}%)`
            }}
          >
            {produtos.map(produto => (
              <div key={produto.id} className="flex-none sm:w-1/2 md:w-1/3 lg:w-1/4 h-full mb-6 p-2">
                <CardProduto produtos={produto} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="p-2"
          disabled={currentIndex >= produtos.length - produtosPerPage}
          /*           18                 51       =47          4*/
        >
          <FaAngleRight size={36} className="fill-customBlueRelease" /> {/*alterações do botão*/}
        </button>
      </div>
    </div>
  );
};

export default ListaProdutos;
