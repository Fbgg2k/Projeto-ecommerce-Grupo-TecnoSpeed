import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaUserEdit,
  FaDollarSign,
  FaAngleRight,
} from "react-icons/fa";
import { GiCrownOfThorns } from "react-icons/gi";
import CopyRight from "../componentes/CopyRight";
import { useAuth } from "../contexts/AuthProvider"; // Import do AuthProvider

function Cadastro() {
  const [userInfo, setUserInfo] = useState({
    nome: "",
    cpf: "",
    email: "",
    endereco: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    senha: "", // Novo campo
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Hook do AuthProvider

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuário cadastrado:", data.usuario);
        navigate("/logado", { state: { userInfo: data.usuario } });
      } else {
        console.error("Erro ao cadastrar usuário:", await response.text());
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Função para abrir a página home em uma nova aba
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
        {/* Botão Carrinho */}
        <button className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm shadow-md  border-2 text-customBlueBorder border-customBlueBorder">
          <FaShoppingCart className="text-xl text-customBlueBorder" />
          <span className="text-customBlueBorder mx-2" onClick={goToCart}>
            Carrinho
          </span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        {/* Botão Identificação */}
        <button className="flex items-center justify-center w-full px-6 py-3 mb-4 md:mb-0 rounded-sm border-2 bg-customBlueRelease border-customBlueBorder">
          <FaUserEdit className="text-xl text-white" />
          <span className="text-white mx-2">Identificação</span>
        </button>
        <FaAngleRight className="text-[3rem] mx-6 text-customBlueRelease hidden md:block" />
        {/* Botão Pagamento */}
        <button className="flex items-center justify-center w-full px-6 py-3 rounded-sm border-2 bg-white border-customBlueBorder">
          <FaDollarSign className="text-xl text-customBlueRelease" />
          <span className="text-customBlueRelease mx-2" onClick={goToPay}>
            Pagamento
          </span>
        </button>
      </div>

      {/* Formulário de Cadastro */}
<div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center">
    Cadastro de Dados
  </h2>
  {/* Inputs Principais */}
  <div className="mb-6 flex flex-col items-center gap-4">
    {/* Input maior para Nome */}
    <input
      type="text"
      name="nome"
      value={userInfo.nome}
      onChange={handleChange}
      placeholder="Nome"
      className="border border-gray-300 rounded p-2 w-full md:w-3/4 lg:w-3/5"
    />
    {/* Inputs menores alinhados */}
    <div className="flex flex-wrap justify-between gap-4 w-full lg:w-3/5">
      <input
        type="text"
        name="cpf"
        value={userInfo.cpf}
        onChange={handleChange}
        placeholder="CPF"
        className="border border-gray-300 rounded p-2 w-full sm:w-[25%] lg:w-[20%]"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className="border border-gray-300 rounded p-2 w-full sm:w-[50%] lg:w-[50%]"
      />
      <input
        type="password"
        name="senha"
        value={userInfo.senha}
        onChange={handleChange}
        placeholder="Senha"
        className="border border-gray-300 rounded p-2 w-full sm:w-[25%] lg:w-[20%]"
      />
    </div>
  </div>

  {/* Endereço de Entrega */}
  <h2 className="text-2xl font-bold mb-6 text-center">
    Endereço de Entrega
  </h2>
  <div className="mb-6 flex flex-col items-center gap-4">
    {/* Input maior para Endereço */}
    <input
      type="text"
      name="endereco"
      value={userInfo.endereco}
      onChange={handleChange}
      placeholder="Nome da Rua/Endereço"
      className="border border-gray-300 rounded p-2 w-full md:w-3/4 lg:w-3/5"
    />
    {/* Inputs menores alinhados */}
    <div className="flex flex-wrap justify-between gap-4 w-full lg:w-3/5">
      <input
        type="text"
        name="numero"
        value={userInfo.numero}
        onChange={handleChange}
        placeholder="Número"
        className="border border-gray-300 rounded p-2 w-full sm:w-[20%] lg:w-[15%]"
      />
      <input
        type="text"
        name="cidade"
        value={userInfo.cidade}
        onChange={handleChange}
        placeholder="Cidade"
        className="border border-gray-300 rounded p-2 w-full sm:w-[30%] lg:w-[30%]"
      />
      <input
        type="text"
        name="estado"
        value={userInfo.estado}
        onChange={handleChange}
        placeholder="Estado"
        className="border border-gray-300 rounded p-2 w-full sm:w-[20%] lg:w-[15%]"
      />
      <input
        type="text"
        name="cep"
        value={userInfo.cep}
        onChange={handleChange}
        placeholder="CEP"
        className="border border-gray-300 rounded p-2 w-full sm:w-[30%] lg:w-[30%]"
      />
    </div>
  </div>

  {/* Botão de salvar */}
  <div className="text-center mt-8">
    <button
      className="w-32 h-12 bg-customBlue text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
      onClick={handleSave}
    >
      Salvar
    </button>
  </div>
</div>




      {/* Copyright */}
      <div className="mt-20 w-full text-center text-sm text-gray-600">
        <CopyRight />
      </div>
    </div>
  );
}

export default Cadastro;
