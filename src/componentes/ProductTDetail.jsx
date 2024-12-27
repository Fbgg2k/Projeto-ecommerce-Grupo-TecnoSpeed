import React from 'react';
import InfoTecnicas from './InfoTecnicas';

const ProductTDetail = ({ produto }) => {

  // Caso as informações técnicas não existam ou estejam vazias
  if (!produto || !produto.infoTecnicas || produto.infoTecnicas.length === 0) {
    return <p className='lg:pl-6 md:pl-8 sm:pl-0  mt-5'>Ficha técnica não disponível.</p>;
  }

  const infoTecnicas = produto.infoTecnicas;

  return (
    <div className="p-1">
      <h3 className="grid grid-cols-1 md:grid-cols-2 text-lg"></h3>
      <ul className="lg:ml-5 md:ml-7 sm:ml-0 mt-2 list-disc">
        <InfoTecnicas infoTecnicas={infoTecnicas} />
      </ul>
    </div>
  );
};

export default ProductTDetail;
