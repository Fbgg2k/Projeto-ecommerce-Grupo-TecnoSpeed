import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import CadastroFooter from "../componentes/CadastroFooter";
import CopyRight from "../componentes/CopyRight";
import CardProduto from "../componentes/CardProduto";
import ListaProdutos from "../componentes/ListaProdutos";
import Carousel from "../componentes/Carousel";
import { FaArrowsUpDown } from "react-icons/fa6";
import { FilterContext } from "../contexts/FilterContext";
import api from "../services/api"; // Importe a API

function Categoria() {
  const { categoria } = useParams();
  const { ordenacao, setOrdenacao } = useContext(FilterContext);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Buscar produtos pela categoria
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/produtos/categoria/${categoria}`);
        setProdutos(response.data.data);
      } catch (err) {
        setError("Erro ao carregar os produtos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [categoria]);

  // Função de classificação
  const ordenarProdutos = (produtos) => {
    return [...produtos].sort((a, b) => {
      const precoA = a.promocao
        ? a.preco - a.preco * (a.desconto / 100)
        : a.preco;
      const precoB = b.promocao
        ? b.preco - b.preco * (b.desconto / 100)
        : b.preco;

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

  const listaOrdenada = ordenarProdutos(produtos);
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
        <div className="p-4 flex justify-between items-center">
          <div className="flex flex-cols-1 md:flex-cols-2 text-md pl-20 font-semibold text-gray-600 gap-4">
            <Link to="/" className="text-gray-600 hover:underline">
              Inicial
            </Link>
            <p>/</p>
            <p className="font-extrabold">{categoria}</p>
          </div>

          {/* Botão para alternar a visibilidade do menu de ordenação */}
          <div className="p-4 mb-4 flex relative">
            <button
              ref={buttonRef}
              onClick={() => setMenuVisivel(!menuVisivel)}
              className="flex items-center p-2 pr-[3rem] text-gray-600 text-md font-extrabold"
            >
              <FaArrowsUpDown className="mr-2 text-2xl" />
              Ordenar por:
            </button>
            {menuVisivel && (
              <div 
                ref={menuRef}
                className="absolute right-0 mt-12 w-48 bg-white border text-gray-600 rounded shadow-lg z-50 font-extrabold">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-16 pl-24 pr-[6rem] gap-[4rem]">
          {listaOrdenada.map((produto) => (
            <div key={produto.id}>
              <CardProduto produtos={produto} />
            </div>
          ))}
        </div>{" "}
        {/*alterações*/}
        <div className="px-6 m-6 mt-28">
          <h2 className="text-center text-3xl font-bold mb-8 mt-8">Ofertas</h2>
          <ListaProdutos />
        </div>
        <div className="p-6 mb-6 px-8">
          <h2 className="text-3xl font-bold mb-8 pl-6 text-center">
            Lançamentos
          </h2>
          <p className="mb-4 text-md px-48 text-justify">
            Bem-vindo à nossa seção de lançamentos, onde você encontra as mais
            recentes novidades do mercado. Nosso objetivo é trazer produtos
            inovadores que atendam às suas necessidades e superem suas
            expectativas. Fique por dentro das últimas tendências e encontre
            itens exclusivos que acabam de chegar em nossa loja.
          </p>
          <p className="mb-4 text-md px-48 text-justify">
            Nossos lançamentos são cuidadosamente selecionados para garantir a
            máxima qualidade e satisfação. Cada produto passa por um rigoroso
            processo de avaliação para assegurar que você tenha acesso ao melhor
            do mercado. Queremos proporcionar uma experiência de compra única,
            com produtos que fazem a diferença no seu dia a dia.
          </p>
          <p className="mb-4 text-md px-48 text-justify">
            Além de novidades incríveis, oferecemos detalhes completos sobre
            cada lançamento, incluindo descrições detalhadas, especificações
            técnicas e avaliações de outros clientes. Isso facilita a sua
            decisão de compra, garantindo que você escolha o item perfeito para
            suas necessidades. Aproveite e explore cada categoria de lançamento.
          </p>
          <p className="mb-4 text-md px-48 text-justify">
            Mantenha-se atualizado assinando nossa newsletter e seguindo nossas
            redes sociais. Dessa forma, você será o primeiro a saber sobre novos
            produtos, promoções exclusivas e muito mais. Nossa loja virtual está
            sempre se renovando para trazer o que há de mais moderno e inovador
            para você.
          </p>
        </div>
        <CadastroFooter />
        <Footer />
        <CopyRight />
      </main>
    </div>
  );
}

export default Categoria;
