import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import ListaProdutos from "../componentes/ListaProdutos";
import CopyRight from "../componentes/CopyRight";
import { ShopContext } from "../context/shop-context";
import Table from "../componentes/TabResume";
import ProductItem from "../componentes/ProductItem"
import MenuCarrinho from "../componentes/MenuCarrinho";

function Carrinho() {
  const { totalCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleContinuarCompra = () => {
    navigate('/login');
  };


  return (
    <div className="mt-4">
      <MenuCarrinho />     
      <div className="flex w-full h-full flex-col mt-8 px-6 md:px-8 lg:px-10 xl:px-32">
        <div className="mt-14">
          <div className='md:justify-start mt-[2rem]'>
            <h2 className=" text-preto lg:text-3xl md:text-xl font-semibold mb-8 text-start font-visby">Produtos no carrinho:</h2>
            <ProductItem />
          </div>
          <div className="w-full  text-center">
            <div className=" md:mt-10 p-6 bg-customGrayBg w-full">
              <p className="text-2xl font-visby">
                Subtotal:
                <span className="text-2xl font-bold"> R$ {(totalCart).toFixed(2)} em até 10x sem juros.</span>
              </p>
            </div>
          </div>
          <div className="md:flex relative justify-between mt-10 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-8">
              {/* Entrega */}
              <div className="flex flex-col mb-4 md:mb-0 w-full">
                <label className="text-lg font-semibold mb-2" htmlFor="cep">
                  Prazo de Entrega
                </label>
                <input
                  id="cep"
                  type="text"
                  placeholder="CEP"
                  className="border-2 border-customBlue rounded p-2 mb-2 lg:w-64 xl:w-80"
                />
                <button className="border-2 border-customBlue text-customBlue bg-white rounded p-2 w-full lg:w-1/3 md:w-2/4 hover:bg-customBlue hover:text-white">
                  Calcular
                </button>
              </div>
              {/* Cupom de Desconto */}
              <div className="flex flex-col mb-4 md:mb-0 w-full xl:space-x-8">
                <label className="text-lg text-customHeaderBlack font-semibold mb-2 xl:mx-8" htmlFor="codigo-cupom">
                  Cupom de Desconto
                </label>
                <input
                  id="codigo-cupom"
                  type="text"
                  placeholder="Código do Cupom"
                  className="border-2 border-customBlue rounded p-2 mb-2 lg:w-64 xl:w-80"
                />
                <button className="md:justify-end md:w-2/4 lg:w-1/3 border-2 border-customBlue hover:bg-customBlue hover:text-white text-customBlue rounded p-2 w-full">
                  Aplicar
                </button>
              </div>
            </div>
            <div className="flex-col w-full md:ml-6 lg:ml-12 xl:w-2/6 md:-mt-10">
              <h2 className="text-lg mt-8 font-extrabold text-customHeaderBlack mb-2">Resumo:</h2>
              <Table />
              <button
                onClick={handleContinuarCompra}
                className="border text-white p-2 w-full mt-4 bg-customBlue flex items-end justify-center rounded-md hover:bg-customBlueDark"
              >
                <FaRegCheckCircle className="w-5 h-7 mr-2 text-white" />
                Continuar a Compra
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-2xl font-bold mt-16 mb-8 text-customHeaderBlack">
          Não perca essas ofertas:
        </p>
        <ListaProdutos />
      </div>
      <div>
        <CopyRight />
      </div>
    </div>
  );
}




export default Carrinho;
