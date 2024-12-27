import React, { useState, useEffect } from "react";
import CardProduto from "./CardProduto";
import api from "../services/api";

const Ofertas = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Função para buscar produtos em oferta
  const fetchProdutosEmOferta = async () => {
    try {
      const response = await api.get("/produtos/ofertas"); // Faz a requisição para a rota correta
      if (response.status === 200) {
        const produtos = response.data.data;
        // Seleciona 4 produtos aleatórios
        const produtosAleatorios = produtos
          .sort(() => Math.random() - 0.5) // Embaralha os produtos
          .slice(0, 4); // Pega os primeiros 4 produtos do array embaralhado
        setProdutos(produtosAleatorios); // Atualiza o estado com os produtos aleatórios
      } else {
        setProdutos([]);
        console.error("Nenhum produto em oferta disponível.");
      }
    } catch (err) {
      console.error("Erro ao buscar produtos em oferta:", err);
      setError("Erro ao carregar ofertas.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para chamar a função de busca ao carregar o componente
  useEffect(() => {
    fetchProdutosEmOferta();
  }, []);

  // Renderiza uma mensagem enquanto os dados estão sendo carregados
  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando ofertas...</p>;
  }

  // Renderiza uma mensagem em caso de erro
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="lg:mb-14 md:mb-6 sm:mb-0 mt-6">
      <h2 className="text-center text-3xl mb-8 mt-10 font-bold ">Ofertas</h2>
      {produtos.length > 0 ? (
        <div className="gap-10 lg:gap-x-14 flex justify-between">
          {produtos.map((produto) => (
            <div key={produto.id} className="h-full w-full sm:w-1/2">
              <CardProduto produtos={produto} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Nenhuma oferta disponível no momento.
        </p>
      )}
    </div>
  );
};

export default Ofertas;
