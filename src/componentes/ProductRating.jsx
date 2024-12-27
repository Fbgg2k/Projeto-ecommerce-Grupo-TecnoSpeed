//ícone estrela
import { StarIcon } from '@heroicons/react/solid';

function ProductRating({ rating = 4 }) {
  const totalStars = 5; // Total de estrelas que queremos exibir

  // Função para renderizar as estrelas
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-7 sm:h-7  ${i <= rating ? 'text-[#36618E]' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="p-3">
      <div className="-mx-4 flex space-x-1 ">
        {renderStars()}       
      </div>
    </div>
  );
}



export default ProductRating;

