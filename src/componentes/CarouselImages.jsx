import React, { useState, useEffect } from 'react';

const images = [
  "https://i.imgur.com/Pgk3SqJ.jpg",
  "https://i.imgur.com/BILPRhz.jpeg",
  "https://i.imgur.com/6krwpXk.jpeg",
  "https://i.imgur.com/RJaBKxv.jpeg"
];

function CarouselImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ciclo automático entre as imagens
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Muda de imagem a cada 4 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <div className="relative h-80 w-full"> 
      {/* Contêiner para as imagens com overflow-hidden */}
      <div className="overflow-hidden h-full">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel ${index}`}
              className="object-cover h-80 w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>
      
      {/* Contêiner para as bolinhas de navegação */}
      <div className="absolute -bottom-6 flex justify-center space-x-2 w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CarouselImages;
