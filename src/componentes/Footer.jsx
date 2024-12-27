import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePhone, faSquareEnvelope, faLock, faBarcode, faShield } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faSquareInstagram, faPix, faSquareYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white flex items-center py-14 h-100 md:h-96 border-t-2  border-[#36618E] ">
      <div className="lg:mx-10 lg:px-10 md:mx-2 md:px-2  sm:mx-10 sm:px-2 ">
        <div className="grid  sm:grid-cols-2 md:grid-cols-4  gap-8">     
          <div className="col-span-1 lg:mx-auto lg:text-left pl-2">
            <h2 className="font-bold lg:text-xl text-[#191C20] mb-3">LOGIN</h2>
            <ul className="text-gray-600">
              <li className="font-bold lg:text-xl text-[#191C20] mb-3">MINHA CONTA</li>
              <li className="font-bold lg:text-xl text-[#191C20] mb-3">MEUS PEDIDOS</li>
              <li className="font-bold lg:text-xl text-[#191C20] mb-3">ENCONTRE UMA LOJA</li>
              <li className="font-bold lg:text-xl text-[#191C20] mb-3">TRABALHE CONOSCO</li>
              <li className="font-bold lg:text-xl text-[#191C20] mb-3">SOBRE A GENERAL STORE</li>
            </ul>
          </div>
          <div className="col-span-1 mx-auto text-left">
            <h2 className="font-bold lg:text-xl text-[#191C20] mb-3">AJUDA</h2>
            <ul className="text-gray-600">
              <li className="font-semibold lg:text-xl text-[#191C20] mb-3">Dúvidas Frequentes</li>
              <li className="font-semibold lg:text-xl text-[#191C20] mb-3">Trocas e Devoluções</li>
              <li className="font-semibold lg:text-xl text-[#191C20] mb-3">Entregas e Retiradas</li>
              <li className="font-semibold lg:text-xl text-[#191C20] mb-3">Pagamentos e Promoções</li>
              <li className="font-semibold lg:text-xl text-[#191C20] mb-3">Privacidade e Cookies</li>
            </ul>
          </div>
          <div className='flex'>
            <div className=" text-left sm:pl-2">
              <ul className="text-black">
                <h2 className="flex items-start justify-start font-bold lg:text-xl text-[#191C20] mb-3 ">CONTATO E SOCIAL</h2>
                <li className="flex  md:items-start  lg:items-start lg:justify-start lg:text-xl font-normal lg:gap-2 sm:gap-2 mb-2">
                  <FontAwesomeIcon icon={faSquarePhone} className="lg:h-6 lg:w-6 md:h-4 md:w-4 sm:h-6 sm:w-6" />
                  <p className='lg:text-lg md:text-sm sm:text-lg'>
                    0800-000-1234
                  </p>
                </li>
                <li className="flex justify-start  gap-2.5 mb-2">
                  <FontAwesomeIcon icon={faSquareEnvelope} className="lg:h-6 lg:w-6 md:h-4 md:w-4 sm:h-6 sm:w-6 " />
                  <p className='lg:text-lg md:text-sm'>
                    contato@generalstore.com.br
                  </p>
                </li>
                <li className="flex justify-start space-x-2 mt-3  gap-2">
                  <FontAwesomeIcon icon={faSquareFacebook} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                  <FontAwesomeIcon icon={faSquareInstagram} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                  <FontAwesomeIcon icon={faSquareYoutube} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                  <FontAwesomeIcon icon={faTiktok} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                </li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-auto lg:ml-[4rem] md:pl-8 sm:pl-16 lg:col-span-1  mx-auto text-center">
              <h2 className="font-bold lg:text-xl text-[#191C20] mb-3">PAGAMENTO</h2>
              <div className="flex gap-3">
                <FontAwesomeIcon icon={faPix} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                <FontAwesomeIcon icon={faBarcode} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10 mb-8" />
              </div>
              <h2 className="font-bold lg:text-xl text-[#191C20] mb-3">SEGURANÇA</h2>
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faShield} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
                <FontAwesomeIcon icon={faLock} className="lg:h-10 lg:w-10 md:h-7 md:w-7 sm:h-10 sm:w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
