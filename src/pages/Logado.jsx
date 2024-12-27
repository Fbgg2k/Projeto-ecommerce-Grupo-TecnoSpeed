import { useEffect } from "react"; // Combinação das alterações necessárias
import { useLocation, useNavigate } from "react-router-dom";
import CopyRight from "../componentes/CopyRight";

import MenuCarrinho from "../componentes/MenuCarrinho";
import NotaFiscalActions from "../componentes/NotaFiscalActions";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaUserEdit,
  FaDollarSign,
  FaAngleRight,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider"; // Importe o AuthProvider

function Logado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = location.state || {}; // Recupera informações do usuário
  const { user, logout } = useAuth(); // Use o contexto para acessar as informações do usuário e o logout

  const handleLogout = () => {
    logout(); // Remove o usuário do estado global
    navigate("/login"); // Redireciona para a página de login
  };

  // Função para mascarar o CPF
  const maskCPF = (cpf) => {
    if (!cpf) return "";
    return `${cpf.substring(0, 3)}.***.***-${cpf.substring(cpf.length - 2)}`;
  };

  const handleAddAddress = () => {
    navigate("/cadastrar-endereco"); // Navega para a página de cadastro de endereço
  };

  const handleCompra = () => {
    navigate("/pagamento"); // Navega para a página de Pagamentos
  };

  const goToHome = () => {
    window.open("/");
  };

  const goToCart = () => {
    navigate("/Carrinho");
  };

  const goToPay = () => {
    navigate("/Pagamento");
  };

  return (
    <div className="flex h-screen flex-col md:flex w-full mt-8 md:px-12 px-6">
      {/* Adicionando o logo */}
      <img
        src={logo}
        alt="Logo"
        className="justify-items-center mx-auto mt-5 h-14 w-auto rounded-md cursor-pointer"
        style={{ width: "12rem", height: "3rem", marginTop: "0.5rem" }}
        onClick={goToHome}
      />
      <div className="border-b border-customBlueBorder mt-6"></div>

      {/* Botões abaixo da imagem */}
      <div className="flex flex-col items-center justify-center md:flex-row flex-1 mt-14">
        <button
          className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm border-2 border-customBlueBorder"
          onClick={goToCart}
        >
          <FaShoppingCart className="text-xl text-customBlueRelease" />
          <span className="text-customBlueRelease mx-2">Carrinho</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        <button className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm bg-customBlueBorder border-2 border-customBlueBorder">
          <FaUserEdit className="text-xl text-branco" />
          <span className=" text-branco mx-2">Identificação</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        <button
          className="flex items-center justify-center w-full px-6 py-3 rounded-sm border-2 border-customBlueBorder"
          onClick={goToPay}
        >
          <FaDollarSign className="text-xl text-customBlueRelease" />
          <span className="text-customBlueRelease mx-2">Pagamento</span>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1>Bem-vindo, {user?.nome || "Usuário"}</h1>

        {/* Resto do código */}
      </div>

      {/* Exibição das Informações do Usuário */}
      <div className="mt-8 bg-white rounded-lg">
        <h2 className="text-xl font-bold text-customHeaderBlack">Dados</h2>
        <div className="border-b border-customGray mt-2 mb-8"></div>
        <div className="mb-4">
          <div className="mb-4">
            <strong>Nome:</strong>
            <p>{userInfo?.nome || "Nome não informado"}</p>
          </div>
          <div className="mb-4">
            <strong>CPF:</strong>
            <p>{maskCPF(userInfo?.cpf) || "CPF não informado"}</p>
          </div>
          <div className="mb-14">
            <strong>Email:</strong>
            <p>{userInfo?.email || "Email não informado"}</p>
          </div>
        </div>

        {/* Endereço do Usuário */}
        <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
        <div className="border-b border-customGray mt-2 mb-8"></div>
        {userInfo?.endereco ? (
          <div className="mb-4 flex items-center gap-4">
            <input
              type="radio"
              name="confirmAddress"
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
            />
            <p className="flex-grow">
              <strong>Endereço:</strong> {userInfo.endereco}, {userInfo.numero},{" "}
              {userInfo.cidade} - {userInfo.estado}, {userInfo.cep}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Nenhum endereço cadastrado</p>
        )}

        {/* Botões de ação */}
        <div className="flex md:justify-between justify-center mt-4">
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 mb-10 border text-customBlueRelease border-customBlueRelease hover:text-white rounded hover:bg-customBlue transition duration-300"
          >
            Cadastrar Novo Endereço
          </button>
          {/* Botão de logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mb-10 md:mr-4"
            style={{ alignSelf: "flex-end" }}
          >
            Sair
          </button>
        </div>

        <div className="flex justify-center py-10 ">
          <button
            onClick={handleCompra}
            className="border text-white rounded-md px-8 md:px-12 w-80 h-11 bg-customBlue"
          >
            <FaRegCheckCircle className="w-5 h-5 mt-0.5 absolute flex text-white text-bold" />{" "}
            Continuar Compra
          </button>
        </div>
      </div>
      <NotaFiscalActions />

      {/* Footer */}
      <div className="mt-8 w-full text-center text-sm text-gray-600">
        <CopyRight />
      </div>
    </div>
  );
}

export default Logado;
