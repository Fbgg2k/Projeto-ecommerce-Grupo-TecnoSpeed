import React from 'react';

const ProductGallery = ({ imagens, onThumbnailClick }) => {
  // Limita as imagens a 6, se necessário
  const limitedImages = imagens.slice(0, 6);

  return (
    <div className="thumbnail-gallery flex space-x-2">
      {limitedImages.map((imagem, index) => (
        <div key={index} className="thumbnail">
          <img
            src={imagem}
            alt={`Imagem ${index + 1}`}
            className="lg:w-32 lg:h-32 md:w-16 md:h-16 sm:w-20 sm:h-20 image-cover cursor-pointer hover:border-gray-700 hover:scale-105 transition-transform duration-300"
            onClick={() => onThumbnailClick(imagem)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
