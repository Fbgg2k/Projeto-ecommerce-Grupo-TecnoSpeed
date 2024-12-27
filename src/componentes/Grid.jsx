import { Link } from "react-router-dom";

function Grid() {
  return (
    <>
      <div className="w-full p-2 flex flex-col md:flex-row md:h-[40rem] gap-2 md:gap-0">
        {/* Div para OUTLET */}
        <div
          className="flex items-end p-6 justify-center rounded-tl-lg rounded-bl-lg bg-cover bg-center bg-no-repeat md:w-4/12 md:h-full"
          style={{
            backgroundImage: 'url("src/assets/images/grid_outlet.png")',
          }}
        >
          <div className="rounded-full bg-[#36618E] px-4 w-64 h-9 items-center flex justify-center shadow-gray-900 shadow-md  ">
            <Link className="text-white font-visby text-lg leading-[36px] tracking-[0.15em] text-center"
            to="/outlet"
            >
              OUTLET
            </Link>
          </div>
        </div>

        {/* Div para MASCULINO e FEMININO */}
        <div className="flex flex-col md:w-5/12 gap-2">
          {/* Div para MASCULINO */}
          <div
            className="h-1/2 md:h-2/5 flex items-end p-6 justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("src/assets/images/grid_masculino.png")',
            }}
          >
             <div className="rounded-full bg-[#36618E] px-4 w-64 h-9 items-center flex justify-center shadow-gray-900 shadow-md  ">
              <Link className="text-white font-visby text-lg leading-[36px] tracking-[0.15em] text-center"
                to="/masculino"
                >
                MASCULINO       
              </Link>
            </div>
          </div>

          {/* Div para FEMININO */}
          <div
            className="h-1/2 md:h-3/5 flex items-end p-6 justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("src/assets/images/grid_feminino.png")',
            }}
          >
            <div className="rounded-full bg-[#36618E] px-4 w-64 h-9 items-center flex justify-center shadow-gray-900 shadow-md  ">
              <Link className="text-white font-visby text-lg leading-[36px] tracking-[0.15em] text-center"
                to="/feminino"
                >
                FEMININO       
              </Link>
            </div>
          </div>
        </div>

        {/* Div para CALÇADOS e INFANTIL */}
        <div className="flex flex-col md:w-4/12 gap-2">
          {/* Div para CALÇADOS */}
          <div
            className="h-1/2 md:h-2/3 flex items-end p-6 justify-center rounded-tr-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("src/assets/images/grid_calçados.png")',
            }}
          >
            <div className="rounded-full bg-[#36618E] px-4 w-64 h-9 items-center flex justify-center shadow-gray-900 shadow-md  ">
              <Link className="text-white font-visby text-lg leading-[36px] tracking-[0.15em] text-center"
              to="/calçados"
              >
                CALÇADOS
              </Link>
            </div>
          </div>

          {/* Div para INFANTIL */}
          <div
            className="h-1/2 md:h-1/3 flex items-end p-6 justify-center rounded-br-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("src/assets/images/grid_infantil.png")',
            }}
          >
            <div className="rounded-full bg-[#36618E] px-4 w-64 h-9 items-center flex justify-center shadow-gray-900 shadow-md">
              <Link className="text-white font-visby text-lg leading-[36px] tracking-[0.15em] text-center"
              to="/infantil"
              >
                INFANTIL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Grid;
