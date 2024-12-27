import { useState } from 'react';

const SizeSelector = ({ opcoes, categoria, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    if (size.disponivel) {
      setSelectedSize(size.tamanho); // Salvar apenas o tamanho (String ou Number)
      onSizeSelect(size.tamanho); // Enviar o tamanho selecionado
    }
  };

  const sizes = opcoes || [];
  const isCalcados = categoria === 'Calçados';

  return (
    <div>
      {sizes.length > 0 && (
        <>
          <div>
            <p className="lg:text-lg md:text-sm sm:text-lg text-preto lg:mt-8 md:mt-2 sm:mt-8 font-bold">
              Tamanhos disponíveis:
            </p>
            <p className="text-gray-700 lg:text-sm md:text-xs sm:text-sm font-semibold mb-3 underline">
              Ver tabela de medidas
            </p>
          </div>
          <div
            className={isCalcados ? "grid grid-cols-6 gap-2" : "flex flex-wrap gap-2"}
            style={{
              gridTemplateColumns: isCalcados ? 'repeat(6, minmax(0, 1fr))' : '',
            }}
          >
            {sizes.map((size) => (
              <div
                key={size.tamanho}
                className={`relative flex items-center justify-center border-2 
                  ${selectedSize === size.tamanho
                    ? 'bg-gray-500 text-white border-gray-700'
                    : 'bg-gray-300 text-preto border-gray-500'} 
                  ${size.disponivel ? 'cursor-pointer' : 'cursor-not-allowed'}
                  lg:h-10 lg:px-4 sm:h-10 sm:px-4 md:h-6 md:px-3`}
                onClick={() => handleSizeClick(size)}
              >
                <span className="text-lg font-bold">{size.tamanho}</span>
                {!size.disponivel && (
                  <div className="absolute lg:w-12 md:w-8 sm:w-12 h-[2px] bg-gray-500 transform rotate-45" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SizeSelector;
