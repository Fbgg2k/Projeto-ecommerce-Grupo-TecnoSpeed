import React from 'react';
import ProductRating from './ProductRating';

const Avaliacoes = () => {
  // Exemplo de avaliações com nome da pessoa e data
  const avaliacoes = [
    {
      comentario: "O produto chegou com um pequeno defeito, mas foi solucionado rapidamente. O atendimento ao cliente foi ágil e atencioso, garantindo que o problema fosse resolvido sem complicações. Agora, estou extremamente satisfeito com a qualidade e o desempenho do produto. Ele atende todas as minhas necessidades e superou minhas expectativas. A compra valeu muito a pena, e certamente voltarei a adquirir produtos dessa marca no futuro!",
      autor: "João Silva -",
      data: "20/07/2024",
      nota: '4'
    },

    {
      comentario: "A entrega foi rápida, o que foi um ponto positivo. No entanto, o produto não correspondeu totalmente à descrição fornecida. Apesar de o atendimento ao cliente ter sido excelente e resolvido questões rapidamente, o item em si deixou a desejar em termos de qualidade e características. Infelizmente, minha experiência com o produto não foi tão satisfatória quanto eu esperava, apesar do bom suporte recebido.",
      autor: "Carlos Souza -",
      data: "15/07/2024",
      nota: '3'
    },
    {
      comentario: "Estou absolutamente encantado com o Produto! A qualidade é excelente, superando minhas expectativas em todos os aspectos. Desde o momento em que comecei a usar, pude perceber o cuidado nos detalhes e o acabamento impecável. Além disso, é extremamente confortável e prático de usar no dia a dia. A entrega foi rápida e o atendimento ao cliente foi excelente. Recomendo de olhos fechados para quem busca um produto de alta qualidade e confiável. Vale cada centavo!",
      autor: "Ana Costa -",
      data: "12/07/2024",
      nota: '5'
    },


  ];

  return (
    <div className="pr-14">
      <div className="font-extra-bold text-lg w-ful text-preto mb-2">Novas Avaliações:</div>
      <div className="space-y-4">
        {avaliacoes.map((avaliacao, index) => (
          <div key={index} className="border-  border-gray-400">
            <div className="flex justify-between items-start ">
              {/* ProductRating no topo à esquerda */}
              <div className="text-left mb-2 pl-1">
                <div className="text-sm font-extra-bold text-preto"><ProductRating rating={avaliacao.nota} /></div>
              </div>
              {/* autor e data no topo à direita */}
              <div className="text-xs text-right flex mt-3 items-end">
                <div className="text-sm font-extrabold text-preto">{avaliacao.autor}</div>
                <div className="text-sm font-extrabold text-preto">{avaliacao.data}</div>
              </div>
            </div>
            {/* Comentário na parte de baixo, ocupando toda a largura */}
            <div className=" text-preto2 text-left font-normal">
              {avaliacao.comentario}
            </div>
            {/* Linha cinza separando as avaliações */}
            {index < avaliacoes.length && (
              <div className="border-b border-gray-400 mt-6"></div>
            )}
          </div>
        ))}
        <div className="flex flex-col text-center pr-14">
          <a className="cursor-pointer hover:underline mb-12  font-extra-bold font-sm underline text-preto">Ver mais</a>
        </div>
      </div>
    </div>



  );
};

export default Avaliacoes;
