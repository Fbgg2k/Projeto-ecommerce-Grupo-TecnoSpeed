import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const CopyRight = () => {
  return (
    <footer className="bg-white md:max-w-screen-xxl w-max py-7 mt-2 border-t border-gray-400">
      <div className="w-screen">
        <p className="text-center text-gray-600 text-sm text-wrap h-1">
        <FontAwesomeIcon icon={faCopyright} className="mr-1" />      
        2024 General Store. Todos os direitos reservados. Comercial General Ltda. CNPJ: <br></br>
        12.345.678/0001-99 Avenida Central, 1234 - Bloco A - CEP 12345-678 - São Paulo - SP
        </p> 
        </div>
    </footer>
  );
};

export default CopyRight;




