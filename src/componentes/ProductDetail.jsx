import React from 'react';

const ProductDetail = ({ produto }) => {
  
  // Caso as informações adicionais não existam ou estejam vazias
  if (!produto || !produto.infoAdicionais || produto.infoAdicionais.length === 0) {
    return <p className='pl-9 mt-5'>Informações do produto não disponíveis.</p>;
  }

  const infoAdicionais = produto.infoAdicionais;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="mx-4 text-lg font-semibold text-gray-700"></h3>
        <div className="ml-5 flex flex-col gap-3">
          {infoAdicionais.map((info, index) => (
            <p key={index} className="">{info}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
