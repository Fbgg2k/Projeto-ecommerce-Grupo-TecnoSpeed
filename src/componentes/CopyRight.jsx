import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const CopyRight = () => {
  return (
    <footer className="bg-white py-6 h-auto">
      {/* Linha Superior */}
      <hr className="border-t-2 border-customBlueBorder mb-4" />

      <div className="flex justify-center items-center">
        <p className="text-center text-[#36618E] text-sm">
          <FontAwesomeIcon icon={faCopyright} className="mr-1" />
          2024 General Store. Todos os direitos reservados. Comercial General Ltda <br />
          CNPJ: 12.345.678/0001-99 - Avenida Central, 1234 - Bloco A - CEP 12345-678 - São Paulo - SP
        </p>
      </div>
    </footer>
  );
};

export default CopyRight;







