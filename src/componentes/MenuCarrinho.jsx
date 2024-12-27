import React, { useContext } from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
import { FaShoppingCart, FaAngleRight, FaUserEdit, FaDollarSign } from "react-icons/fa"; // Certifique-se de ter instalado o pacote react-icons
import logo from "../assets/logo.png";
import { ShopContext } from "../context/shop-context";

function MenuCarrinho() {

  const { getTotalItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigate("/");
  };
  

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPay = () => {
    navigate("/pagamento");
  };

  const goToCart = () => {
    navigate("/carrinho");
  };


   // Função para verificar se o botão está ativo
   const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.includes(location.pathname);
    }
    return location.pathname === paths;
  };

  return (
    <div>
      {/* Logo */}
      <img
        src={logo}
        className="mx-auto rounded-md cursor-pointer"
        style={{ width: "12rem", height: "3rem", marginTop: "0.5rem" }}
        alt="Logo"
        onClick={goToHome}
      />
      {/* Linha divisória */}
      <div className="border-b flex-grow border-customBlueRelease mt-6"></div>
      {/* Botões */}
      <div className="flex flex-col  items-center justify-center md:flex-row md:justify-between px-32 flex-1 mt-10">
        {/* Botão Carrinho */}
        <div
          onClick={goToCart}
          className={`flex items-center justify-center w-full px-6 py-4 mb-4 md:mb-0 rounded-sm shadow-md border-2 cursor-pointer ${
            isActive("/carrinho")
              ? "bg-customBlueBorder text-white border-customBlueBorder"
              : "border-customBlueBorder text-customBlueBorder"
          }`}
        >
          <div className="relative">
            <FaShoppingCart style={{ width: "2rem", height: "2rem" }} />
            {/* Badge do total de itens */}
            {getTotalItems > 0 && (
              <span className="absolute right-0 left-5 bottom-5 bg-cyan-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems}
              </span>
            )}
          </div>
          <span className="ml-2">Carrinho</span>
        </div>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
         {/* Botão Identificação */}
         <button
          className={`flex items-center justify-center w-full px-6 py-4 mb-4 md:mb-0 rounded-sm border-2 cursor-pointer ${
            isActive(["/login", "/Logado", ])
              ? "bg-customBlueBorder text-white border-customBlueBorder"
              : "border-customBlueBorder text-customBlueBorder"
          }`}
          onClick={goToLogin}
        >
          <FaUserEdit className="text-3xl" />
          <span className="mx-2">Identificação</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        {/* Botão Pagamento */}
        <button
          className={`flex items-center justify-center w-full px-6 py-4 rounded-sm border-2 cursor-pointer ${
            isActive("/pagamento")
              ? "bg-customBlueBorder text-white border-customBlueBorder"
              : "border-customBlueBorder text-customBlueBorder"
          }`}
          onClick={goToPay}
        >
          <FaDollarSign className="text-3xl" />
          <span className="mx-2">Pagamento</span>
        </button>
      </div>
    </div>

  );
}

export default MenuCarrinho;
