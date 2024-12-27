import React, { useState, useRef, useEffect, useContext } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import BarraPesquisa from './BarraPesquisa';
import api from '../services/api';
import { ShopContext } from "../context/shop-context";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getTotalItems } = useContext(ShopContext);

  // Função de pesquisa, chamada pela BarraPesquisa
  const buscarProdutos = async (termo) => {
    if (termo === '') {
      setProdutos([]); // Se o termo de pesquisa estiver vazio, limpa os produtos
      return;
    }

    setLoading(true); // Indica que a pesquisa começou
    try {
      const response = await api.get(`produtos/busca`, {

        params: { nome: termo } // Faz a requisição passando o termo de busca como query param
      });
      console.log(response.data);
      setProdutos(response.data.data); // Atualiza a lista de produtos com os resultados da API
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]); // Em caso de erro, limpa a lista
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToLancamento = () => {
    navigate("/lançamento");
  };

  const goToMasculino = () => {
    navigate("/masculino");
  };

  const goToFeminino = () => {
    navigate("/feminino");
  };

  const goToInfantil = () => {
    navigate("/infantil");
  };

  const goToCalcados = () => {
    navigate("/calçados");
  };

  const goToOutlet = () => {
    navigate("/outlet");
  };

  const openCartInNewTab = () => {
    navigate("/carrinho");
  };

  const openLoginInNewTab = () => {
    navigate("/login");
  };


  // Função para fechar o menu ao clicar fora dele
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center h-full shadow-md py-4">
      <div className="flex flex-row w-full items-center justify-between px-24 h-22">
        <img
          src={logo}
          alt="Logo"
          className="rounded-md cursor-pointer"
          style={{ width: "12rem", height: "3rem", marginTop: "0.8rem" }}
          onClick={goToHome}
        />
        <div className="relative z-50">
          <button className="lg:hidden mt-2 border-none ml-9 text-2xl" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div ref={menuRef} className="sm:absolute sm:mt-3 flex lg:relative bg-white">
            <nav
              className={`lg:relative border lg:border-none flex-col lg:flex-row lg:flex ${isOpen ? "flex flex-col w-52 border-r-2" : "hidden"
                } flex space-x-10 sm:space-y-4 lg:space-y-0`}
            >
              <button onClick={goToLancamento} className="text-customHeaderBlack pr-3 font-semibold text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Lançamentos
              </button>
              <button onClick={goToMasculino} className="text-customHeaderBlack text-start font-semibold text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Masculino
              </button>
              <button onClick={goToFeminino} className="text-customHeaderBlack text-start font-semibold text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Feminino
              </button>
              <button onClick={goToInfantil} className="text-customHeaderBlack text-start font-semibold text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Infantil
              </button>
              <button onClick={goToCalcados} className="text-black-600 font-semibold text-start text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Calçados
              </button>
              <button onClick={goToOutlet} className="text-customHeaderBlack text-start font-semibold text-lg hover:text-customBlueRelease hover:underline cursor-pointer transition duration-300">
                Outlet
              </button>
            </nav>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div>
          <BarraPesquisa onSearch={buscarProdutos} produtos={produtos} loading={loading} /> {/* Passa a função de pesquisa, produtos e loading */}
        </div>
        <div className="flex flex-row gap-3 items-center lg:mr-20 md:mr-6 mr-6">
          <button
            onClick={openLoginInNewTab}
            className={`text-gray-800 text-2xl cursor-pointer transition duration-300 hover:text-gray-400`}
          >
            <FaUserCircle style={{ width: "2rem", height: "2rem" }} />
          </button>
          <div className="relative">
            <button
              onClick={openCartInNewTab}
              className={`text-gray-800 text-2xl cursor-pointer transition duration-300 hover:text-gray-400`}
            >
              <FaShoppingCart style={{ width: "2rem", height: "2rem" }} />
            </button>

            {/* Badge do total de itens */}
            {getTotalItems > 0 && (
              <span onClick={openCartInNewTab} className="absolute  right-0 left-5 bottom-6 bg-cyan-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
