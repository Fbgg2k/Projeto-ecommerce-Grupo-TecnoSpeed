import React, { useState } from 'react';
import image from '../assets/image.png';

const CadastroFooter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Nome Completo:", name);
  };

  return (
    <footer className="flex bg-[#F8F9FF] border-none px-0" >


      <div className="w-1/2">
        <img src={image} alt="Img" className=" image-cover lg:[31.25rem] md:w-full md:h-full sm:h-full sm:w-full rounded shadow-lg" 
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-start" >
        <div className='pl-12 w-full'>
          <form onSubmit={handleLogin} className="w-full h-full px-3 ">
            <div>
            <button className="bg-[#36618E] text-white text-xl py-4 px-10 rounded-full lg:h-9 md:h-8 sm:h-4 shadow-lg mb-4 lg:w-52 md:w-52 sm:w-44  flex items-center justify-center">
              NEWSLETTER
            </button>
            </div>
            <p className="text-preto font-bold mb-2 text-left lg:text-2xl md:text-2xl sm:text-lg ">Cadastre-se agora para não perder:</p>
            <p className="text-preto font-bold mb-6 text-left lg:text-xl md:text-xl sm:text-sm">ofertas, novidades e conteúdos exclusivos!</p>
            <div className="lg:mb-6 md:mb-6 sm:mb-4 flex items-center relative">
          
              <input
                className=" lg:w-1/2 md:w-3/4 sm:w-3/4  border-gray-300 px-2 lg:py-1 md:py-1 sm:py-0 rounded-md font-bold focus:border-indigo-500 sm:text-sm transition-colors duration-300 ease-in-out hover:border-blue-400 appearance-none border leading-tight focus:outline-none "

                id="name"
                type="text"
                placeholder="Nome Completo" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="lg:mb-6 md:mb-6 sm:mb-4 flex items-center relative">
              
              <input
                className=" lg:w-1/2 md:w-3/4 sm:w-3/4 border-gray-300 px-2 lg:py-1 md:py-1 sm:py-0 rounded-md font-bold focus:border-indigo-500 sm:text-sm transition-colors duration-300 ease-in-out hover:border-blue-400 appearance-none border   leading-tight focus:outline-none "
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center  justify-start">
              <button

                className="bg-[#36618E] hover:bg-blue-700 text-white font-bold lg:h-8 md:h-7 sm:py-0 px-4 rounded focus:outline-none focus:shadow-outline lg:w-1/3 md:w-2/3 sm:w-2/3"

                type="submit"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default CadastroFooter;
