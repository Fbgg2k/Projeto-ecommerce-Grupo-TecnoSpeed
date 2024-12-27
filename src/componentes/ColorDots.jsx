
import React, { useState } from 'react';

const ColorDots = ({ cores = [], onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);

  // Definindo o mapeamento de cores para classes CSS
  const colorClasses = {
    'Azul': 'bg-azul',
    'Cinza': 'bg-gray-400',
    'Preto': 'bg-black',
    'Violeta': 'bg-violeta',
    'Roxo': 'bg-roxo',
    'Marrom': 'bg-[#78350f]',      // Corrigido de "Marron" para "Marrom"
    'Branco': 'bg-branco',
    'Verde': 'bg-verde',
    'Vermelho': 'bg-vermelho',
    'Amarelo': 'bg-amarelo',
    'Laranja': 'bg-laranja',
    'Azul-Escuro': 'bg-azulescuro',  // Corrigido de "Azulescuro" para "AzulEscuro"
    'AzulMarinho': 'bg-azul-marinho', // Corrigido de "Azulmarinho" para "AzulMarinho"
    'Bordô': 'bg-bordo',
    'Rosa': 'bg-[#ec4899]',
    'Bege': 'bg-bege',
    'Azul-Claro': 'bg-[#67e8f9]', // Mantido como cor personalizada
    'Vinho': 'bg-[#9f1239]',
    'Prata': 'bg-gray-200',
    'Lilas': 'bg-[#f9a8d4]'
  };

  const handleClick = (color) => {
    setSelectedColor(color);
    onColorSelect(color); // Enviar a cor selecionada
  };
  

  return (
    <div className="flex flex-col items-start mx-1 lg:mt-6 md:mt-2 sm:mt-6 space-x-2">
      <div className="grid grid-cols-6 lg:gap-4 md:gap-2 sm:gap-4">
        {cores.map((cor, index) => (
          <div key={index} className="flex flex-col items-center">
            {hoveredColor === cor && (
              <div className="absolute lg:mt-8 md:mt-5 sm:mt-8 bg-slate-200 text-blue-950 p-2 text-xs z-50">
                {cor}
              </div>
            )}
            <div
              className={`cursor-pointer rounded-full border-2 
                ${colorClasses[cor]} 
                ${selectedColor === cor
                  ? `border-gray-600 shadow-md
                     lg:w-8 lg:h-8 
                     md:w-5 md:h-5 
                     sm:w-8 sm:h-8`
                  : `border-gray-400 
                     lg:w-7 lg:h-7 
                     md:w-4 md:h-4 
                     sm:w-7 sm:h-7`}`}
              onClick={() => handleClick(cor)}
              onMouseEnter={() => setHoveredColor(cor)}
              onMouseLeave={() => setHoveredColor(null)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorDots;