//ícone estrela
import { StarIcon } from '@heroicons/react/solid';

function RatingSpecial({ rating = 4 }) {
  const totalStars = 5; // Total de estrelas que queremos exibir

  // Função para renderizar as estrelas
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-8 h-8 ${i <= rating ? 'text-[#36618E]' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="p-4">
      
      <div className="flex">
        {renderStars()}
      </div>
      <p className='text-preto text-sm  p-2 underline'>10 Avaliações</p>
    </div>
  );
}



export default RatingSpecial;

