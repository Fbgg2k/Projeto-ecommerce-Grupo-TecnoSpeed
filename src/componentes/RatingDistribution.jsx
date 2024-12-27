import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

const RatingDistribution = () => {
  const ratings = [2, 5, 2, 0, 1];
  


  const renderStars = (paintedStars) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <StarIcon key={i} className={`w-8 h-8 ${i < paintedStars ? 'text-[#36618E]' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  return (
    <div className="p-4">
      <h2 className="flex flex-col items-start  text-lg pl-2 font-bold text-preto mb-4">Distribuição</h2>
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="flex mb-2">
              {renderStars(5 - index)}
            </div>
            <span className="pl-2 text-preto text-sm items-center underline">{rating} Avaliações</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;
