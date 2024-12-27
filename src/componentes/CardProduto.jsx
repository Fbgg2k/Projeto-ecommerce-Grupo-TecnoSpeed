import { useState } from "react";
import formatacaoDinheiro from "../utils/formatacaoDinheiro";
import { useNavigate } from "react-router-dom";

const CardProduto = ({ produtos }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showDescriptionColor, setShowDescriptionColor] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);
  const handleMouseEnterColor = () => setShowDescriptionColor(true);
  const handleMouseLeaveColor = () => setShowDescriptionColor(false);


  const navigateToProduct = () => {
    navigate(`/produto/${produtos.id}`);
  };

  return (
    <div
      className="relative flex flex-col lg:w-[16rem] md:[8rem] sm:w-[10rem] mx-auto h-full"
      onClick={navigateToProduct}
    > {/*Dimensionamento container da IMAGEM*/}
      <div
        className="w-full md:grid-cols-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showDescription && (
          <div className="flex justify-center absolute w-4/6 top-1/3  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white p-2 text-xs z-50 ">
            <p>{produtos.descricao}</p>
          </div>
        )}
        <img
          src={produtos.imagens[0]}
          className="max-h-f image-cover lg:h-[13rem] lg:w-[16rem] md:h-[10rem] md:w-[12rem] sm:h-[10rem] sm:w-[11rem]"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          alt="Descrição da imagem"
        /> {/*Dimensionamento da IMAGEM e CAIXA DE TEXTO*/}
      </div>
      <div className=" flex flex-col">
        <p className="text-md text-slate-800  font-extrabold mt-2">{produtos.nome}</p> {/*alteração nas informações*/}
        <div
          className="relative"
          onMouseEnter={handleMouseEnterColor}
          onMouseLeave={handleMouseLeaveColor}
        >
          {showDescriptionColor && (
            <div className="absolute  bottom-full bg-slate-200 text-blue-950 p-2 text-xs z-50">
              <p>{produtos.cores.join(", ")}</p>{" "}
              {/* Linha alterada para exibir as cores */}
            </div>
          )}
          <p className="text-sm text-slate-600 ">
            {produtos.cores.length} cores disponível
          </p>
        </div>
        {produtos.promocao ? (
          <div>
            <p className="line-through font-bold text-sm text-gray-400 ">
              De: {formatacaoDinheiro(produtos.preco)}
            </p>
            <p className="font-semibold text-slate-800 text-xl">
              Por:{" "}
              {formatacaoDinheiro(
                produtos.preco - produtos.preco * (produtos.desconto / 100)
              )}
            </p>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-slate-800 text-xl">
              Por: {formatacaoDinheiro(produtos.preco)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduto;
