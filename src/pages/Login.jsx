import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaShoppingCart, FaAngleRight, FaUserEdit, FaDollarSign } from "react-icons/fa";
import CopyRight from "../componentes/CopyRight"; // Importando o componente CopyRight
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthProvider"; // Import do AuthProvider
import MenuCarrinho from "../componentes/MenuCarrinho";




function Login() {
  const navigate = useNavigate();

  // Estados para capturar email e senha do usuário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, login } = useAuth(); // Hook do AuthProvider


  // Se o usuário estiver logado, redireciona para a página logado
  useEffect(() => {
    if (user) {
      navigate("/Logado");
    }
  }, [user, navigate]);

  // Função para lidar com o login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.usuario); // Salva os dados do usuário no contexto
        navigate("/Logado");
      } else {
        // Exibir mensagem de erro retornada pelo backend
        setErrorMessage(data?.message || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro no servidor. Tente novamente mais tarde.");
    }
  };

  // Função para abrir a página home em uma nova aba
  const goToHome = () => {
    navigate("/");
  };

  const goToCart = () => {
    navigate("/Carrinho");
  };

  const goToPay = () => {
    navigate("/Pagamento");
  };

  const goToSubscribe = () => {
    navigate("/Cadastro");
  };

  return (
    <div className="flex w-full h-screen flex-col mt-8 px-6 md:px-10 lg:px-16 xl:px-32">
      <img
        src={logo}
        className="mx-auto rounded-md cursor-pointer"
        style={{ width: "12rem", height: "3rem", marginTop: "0.5rem" }}
        onClick={goToHome}
      />
      <div className="border-b border-customBlueRelease mt-6"></div>

      {/* Botões abaixo da imagem */}
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between flex-1 mt-10">
        <button
          className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm shadow-md  border-2 text-customBlueBorder border-customBlueBorder"
          onClick={goToCart}
        >
          <FaShoppingCart className="text-xl text-customBlueBorder" />
          <span className="text-customBlueBorder mx-2">Carrinho</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        <button className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm border-2 bg-customBlueRelease border-customBlueBorder">
          <FaUserEdit className="text-xl text-white" />
          <span className="text-white mx-2">Identificação</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        <button
          className="flex items-center justify-center w-full px-6 py-3 rounded-sm border-2 bg-white border-customBlueBorder"
          onClick={goToPay}
        >
          <FaDollarSign className="text-xl text-customBlueRelease" />
          <span className="text-customBlueRelease mx-2">Pagamento</span>
        </button>
      </div>

      {/* Formulário de login */}
      <div className="flex items-center md:flex-grow justify-center w-full mt-20">
        <div className="w-full md:max-w-xl bg-white rounded-lg">
          <h2 className="text-center text-customHeaderBlack text-2xl font-bold mb-8">
            Acesse sua conta ou crie sua conta:
          </h2>
          <div className="flex flex-col w-full gap-4">
            <input
              type="email"
              placeholder="EMAIL"
              className="border border-customGray focus:placeholder-customHeaderBlack rounded-lg p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="SENHA"
              className="border border-customGray focus:placeholder-customHeaderBlack rounded-lg p-2 -mb-3 w-full"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <div className="flex justify-between md:text-sm text-xs">
              <span
                onClick={goToSubscribe}
                className="text-customBlue hover:underline cursor-pointer"
              >
                Criar minha conta
              </span>
              <span
                onClick={() => navigate("/recuperar-senha")}
                className="text-customBlue hover:underline cursor-pointer"
              >
                Esqueci minha senha
              </span>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
            <div className="grid grid-cols-1 justify-items-center">
              <button
                onClick={handleLogin}
                className="border text-white rounded-md p-2 mt-10 w-72 h-11 bg-customBlue"
              >
                <FaRegCheckCircle className="mx-8 w-5 h-5 mt-0.5 absolute flex mr-2 text-white text-bold" />
                Acessar minha conta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <CopyRight />
      </div>
    </div>
  );
}

export default Login;
