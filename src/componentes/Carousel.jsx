import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const messages = [
  "FRETE GRÁTIS NAS COMPRAS ACIMA DE 300 REAIS",
  "ATÉ 40% DE DESCONTO EM ELETRÔNICOS",
  "PARCELE EM ATÉ 18 VEZES SEM JUROS",
  "NOVA COLEÇÃO DE VERÃO DISPONÍVEL",
  "COMPRE 2, LEVE 3 EM TODA A LOJA"
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + messages.length) % messages.length);
  };

  return (
    <div 
      className="relative flex items-center justify-center p-2 bg-customBlue border-b-2 border-customBlueBorder shadow-bg" 
      style={{ height: '3rem'}}
    >
      <button 
        onClick={handlePrev} 
        className="absolute left-0 px-4 text-customLightBlue hover:text-customLightBlue focus:outline-none"
      >
        <FaChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>
      <div className="flex-1 text-xs md:text-sm text-customLightBlue text-center px-6">
        {messages[currentIndex]}
      </div>
      <button 
        onClick={handleNext} 
        className="absolute right-0 px-4 text-customLightBlue hover:text-customLightBlue focus:outline-none"
      >
        <FaChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>
    </div>
  );
}

export default Carousel;
