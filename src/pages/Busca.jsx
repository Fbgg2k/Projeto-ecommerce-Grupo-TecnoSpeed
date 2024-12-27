import React, { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaArrowsUpDown } from "react-icons/fa6";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import CadastroFooter from "../componentes/CadastroFooter";
import CopyRight from "../componentes/CopyRight";
import Carousel from "../componentes/Carousel";
import { FilterContext } from "../contexts/FilterContext"; // Importe o contexto
import CardProduto from "../componentes/CardProduto"; // Certifique-se de ter esse componente
import api from "../services/api"; // Importe o serviço API

function Busca() {
  const [searchParams] = useSearchParams(); // Hook para acessar os query params
  const termoPesquisa = searchParams.get("termo") || ""; // Lê o termo da URL
  const [produtosPesquisa, setProdutosPesquisa] = useState([]);
  const { ordenacao, setOrdenacao } = useContext(FilterContext); // Ordenação via contexto
  const [menuVisivel, setMenuVisivel] = useState(false); // Controle do menu dropdown
  const [loading, setLoading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0); // Total de páginas
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Função de busca adaptada para a página de busca
  const buscarProdutos = async (termo) => {
    if (termo === "") {
      setProdutosPesquisa([]); // Limpa os produtos se não houver termo
      setPaginaAtual(1); // Reseta a página para 1
      setTotalPaginas(0); // Reseta o número de páginas
      return;
    }
  
    setLoading(true); // Inicia o carregamento
    try {
      const response = await api.get(`produtos/busca/geral`, {
        params: { nome: termo }, // Termo de busca como query param
      });
      
      const produtos = response.data.data;
      setProdutosPesquisa(produtos); // Atualiza a lista de produtos
      
      // Atualiza o total de páginas com base na quantidade de produtos encontrados
      const totalProdutos = produtos.length;
      setTotalPaginas(Math.ceil(totalProdutos / produtosPorPagina)); // Calcula o total de páginas
      setPaginaAtual(1); // Reset da página para a 1 após pesquisa
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutosPesquisa([]); // Limpa a lista em caso de erro
      setTotalPaginas(0); // Reseta o total de páginas
    } finally {
      setLoading(false); // Encerra o carregamento
    }
  };

  // Faz a busca assim que o termo de pesquisa muda
  useEffect(() => {
    if (termoPesquisa) {
      buscarProdutos(termoPesquisa); // Faz a busca com o termo recebido
    }
  }, [termoPesquisa]);

  // Função de classificação
  const ordenarProdutos = (produtos) => {
    return [...produtos].sort((a, b) => {
      const precoA = a.promocao ? a.preco - a.preco * (a.desconto / 100) : a.preco;
      const precoB = b.promocao ? b.preco - b.preco * (b.desconto / 100) : b.preco;

      switch (ordenacao) {
        case "preco-asc":
          return precoA - precoB;
        case "preco-desc":
          return precoB - precoA;
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        default:
          return 0;
      }
    });
  };

  // Ordenando os produtos da pesquisa
  const listaOrdenada = ordenarProdutos(produtosPesquisa);

  const totalProdutos = listaOrdenada.length; // Total de produtos após ordenação
  const produtosPorPagina = 12; // Quantidade de produtos por página

  
  const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
  const indiceFinal = indiceInicial + produtosPorPagina;

  // Filtrar os produtos para exibir apenas os da página atual
  const produtosPaginados = listaOrdenada.slice(indiceInicial, indiceFinal);

    // Controlar o clique fora do menu
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setMenuVisivel(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


  return (
    <div>
      <main>
        <Header />
        <Carousel />
        {/* Breadcrumb e botão de ordenar */}
        <div className="p-4 flex justify-between items-center">
          {/* Breadcrumb */}
          <div className="flex flex-cols-1 md:flex-cols-2 text-md pl-20 font-semibold text-gray-600 gap-4">
            <Link to="/" className="text-gray-600 hover:underline">
              Inicial
            </Link>
            <p>/</p>
            <p className="font-extrabold">Busca</p>
            <p className="font-extrabold">/</p>
            <p className="font-extrabold text-gray-600">{termoPesquisa}</p>
          </div>

          {/* Botão de ordenar */}
          <div className="p-4 mb-4 flex relative">
            <button
              onClick={() => setMenuVisivel(!menuVisivel)}
              className="flex items-center p-2 pr-[3rem] text-gray-600 text-md font-extrabold"
              ref={buttonRef}
            >
              <FaArrowsUpDown className="mr-2 text-2xl" />
              Ordenar por:
            </button>
            {menuVisivel && (
              <div className="absolute right-0 mt-12 w-48 bg-white border text-gray-600 rounded shadow-lg z-50 font-extrabold"
              ref={menuRef}
              >
                <button
                  onClick={() => {
                    setOrdenacao("preco-asc");
                    setMenuVisivel(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Preço: Menor para Maior
                </button>
                <button
                  onClick={() => {
                    setOrdenacao("preco-desc");
                    setMenuVisivel(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Preço: Maior para Menor
                </button>
                <button
                  onClick={() => {
                    setOrdenacao("nome-asc");
                    setMenuVisivel(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Nome: A-Z
                </button>
                <button
                  onClick={() => {
                    setOrdenacao("nome-desc");
                    setMenuVisivel(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Nome: Z-A
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col min-h-[100vh] justify-between">
          {/* Resultados da busca */}
          <div className="px-16  pr-[5rem]">
            {/* Título dos resultados */}
            <div>
              <h1 className="text-2xl text-gray-600 text-center mb-[3rem] font-bold ">Resultados da sua busca por "<span className="text-green-600">{termoPesquisa}</span>" retornou <span className="text-green-600">{totalProdutos} </span>produto{totalProdutos !== 1 ? 's' : ''}:</h1>
            </div>
          </div>
          {/* Grid dos resultados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-[4rem] gap-[4rem] ">
            {loading ? (
              <p className="text-center col-span-full">Carregando...</p>
            ) : produtosPaginados.length > 0 ? (
              produtosPaginados.map((produto) => (
                <div key={produto.id}>
                  <CardProduto produtos={produto} />
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-red-600 col-span-full">Nenhum produto encontrado ! ! !</p>
            )}
          </div>
          {/* Controles de Paginação */}
          <div className="flex justify-center items-center mt-4 mb-8 text-xl font-visby">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className="p-2 mx-2"
            >
              Anterior
            </button>
            <div>
            <span className="px-4">{`${paginaAtual} de ${totalPaginas}`}</span>
            </div>
            <button
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="p-2 mx-2"
            >
              Próximo
            </button>
          </div>
        </div>
        <CadastroFooter />
        <Footer />
        <CopyRight />
      </main>
    </div>
  );
}

export default Busca;
