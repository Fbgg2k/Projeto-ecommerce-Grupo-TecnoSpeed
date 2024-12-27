import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBarcode, FaQrcode, FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import CopyRight from "../componentes/CopyRight";
import Table from "../componentes/TabResume";
import ProductItem from "../componentes/ProductItem";
import api from "../services/api";
import { ShopContext } from "../context/shop-context";
import { GiSmartphone, GiConfirmed } from "react-icons/gi";
import { BsQrCodeScan } from "react-icons/bs";
import { SiPix } from "react-icons/si";
import InvoiceComponent from "../componentes/InvoiceComponent";
import MenuCarrinho from "../componentes/MenuCarrinho";
import NotaFiscalActions from "../componentes/NotaFiscalActions";

function Pagamento() {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState(null); // Estado para armazenar o QR Code.
  const [loading, setLoading] = useState(false); // Estado para gerenciar o carregamento.
  const [error, setError] = useState(null); // Estado para erros.
  const [showModal, setShowModal] = useState(false);
  const { totalCart, clearCart } = useContext(ShopContext);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldHighlightButtons, setShouldHighlightButtons] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [copyError, setCopyError] = useState("");

  const fetchQrCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const id = "123"; // Substitua pelo ID correto da cobrança.
      const response = await api.get(`/pix/qr/${id}`);
      setQrCode(response.data); // Certifique-se de que a API retorna o campo correto com a imagem do QR Code.
    } catch (err) {
      setError("Erro ao buscar o QR Code. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = () => {
    if (!selectedPayment) {
      alert(`Selecione um método de pagamento!`);
      setShouldHighlightButtons(true);
      setTimeout(() => setShouldHighlightButtons(false), 3500);
      return;
    }

    setErrorMessage(""); // Reseta a mensagem de erro caso um método tenha sido selecionado.

    if (selectedPayment === "PIX") {
      handlePixPayment();
    } else if (selectedPayment === "Boleto") {
      handleBoletoPayment();
    }
  };

  const handlePixPayment = () => {
    fetchQrCode();
    setShowModal(true);
    setPaymentComplete(false);
  };

  const handleBoletoPayment = () => {
    setShowInvoiceModal(true); // Exibe o modal com a fatura.
  };

  const goToCart = () => {
    navigate("/Carrinho");
  };

  const handlePixCopyPaste = async () => {
    const pixCode =
      "00020126680014BR.GOV.BCB.PIX0114+55119999999980201500165004BR00000000"; // Substitua pelo seu código Pix
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopySuccess("Código Pix copiado com sucesso!");
      setCopyError(""); // Remove mensagens de erro
      setTimeout(() => setCopySuccess(""), 3000); // Limpa sucesso após 3 segundos
    } catch (err) {
      setCopyError("Falha ao copiar o código Pix.");
      setCopySuccess(""); // Remove mensagens de sucesso
      setTimeout(() => setCopyError(""), 3000); // Limpa erro após 3 segundos
    }
  };

  // UseEffect para simular o pagamento após 20 segundos e limpar o carrinho.
  useEffect(() => {
    if (showModal) {
      // Exibe a mensagem de "Pagamento concluído" após 5 segundos
      const paymentTimer = setTimeout(() => {
        setPaymentComplete(true); // Marca o pagamento como concluído

        // Limpa o carrinho após 4 segundos da mensagem de pagamento
        const clearCartTimer = setTimeout(() => {
          clearCart(); // Limpa o carrinho
          setShowModal(true); // Fecha o modal
        }, 4000); // Aguarda mais 4 segundos antes de limpar o carrinho

        return () => clearTimeout(clearCartTimer); // Limpa o timer caso o modal seja fechado antes
      }, 5000); // Aguarda 10 segundos para exibir "Pagamento concluído"

      return () => clearTimeout(paymentTimer); // Limpa o timer caso o modal seja fechado antes
    }
  }, [showModal]);

  return (
    <div className="flex flex-col mt-2 min-h-screen">
      <MenuCarrinho />
      <div className="flex w-full  flex-grow flex-col mt-8 md:px-10 lg:px-16 xl:px-32">
        {/* Botões abaixo da imagem */}
        <div className="flex flex-col  md:flex-row mx-[6rem] gap-12 mt-[6rem] ">
          <div className="flex flex-col w-full md:w-6/12 ">
            <h2 className="text-start text-lg md:text-3xl text-preto font-visby  font-bold mb-4">
              Pagamento:
            </h2>
            <div className="border-t mb-4 border-gray-400 "></div>
            <div className="flex justify-start md:justify-center gap-8">
              <button
                onClick={() => setSelectedPayment("PIX")}
                className={`flex flex-col items-center justify-center w-[14rem] h-[11rem] border-2 rounded-lg shadow-md transition duration-300 ${
                  selectedPayment === "PIX"
                    ? "bg-gray-300 border-customBlueBorder"
                    : "bg-white border-customBlueBorder hover:bg-gray-300"
                } ${shouldHighlightButtons ? "animate-blink" : ""}`}
              >
                <FaQrcode className="text-5xl text-customBlueBorder" />
                <span className="mt-2 text-customBlueBorder">Via PIX</span>
              </button>
              <button
                onClick={() => setSelectedPayment("Boleto")}
                className={`flex flex-col items-center justify-center w-[14rem] h-[11rem] border-2 rounded-lg shadow-md transition duration-300 ${
                  selectedPayment === "Boleto"
                    ? "bg-gray-300 border-customBlueBorder"
                    : "bg-white border-customBlueBorder hover:bg-gray-300"
                } ${shouldHighlightButtons ? "animate-blink" : ""}`}
              >
                <FaBarcode className="text-5xl text-customBlueBorder" />
                <span className="mt-2 text-customBlueBorder">Via Boleto</span>
              </button>
            </div>
            {/* Modal para o QR Code */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-w-3xl flex flex-col gap-4">
                  {loading ? (
                    <p>Carregando...</p>
                  ) : error ? (
                    <span className="text-red-500">{error}</span>
                  ) : paymentComplete ? (
                    // Mensagem de pagamento concluído
                    <div className="flex flex-col items-center gap-4 w-full">
                      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                      <h2 className="text-xl font-bold">
                        Pagamento concluído com sucesso!
                      </h2>

                      {/* Botão Baixar Nota Fiscal */}
                      <NotaFiscalActions />

                      {/* Botão Fechar */}
                      <button
                        onClick={() => setShowModal(false)}
                        className="w-full border p-4 font-bold text-xl border-customBlueBorder rounded-md text-customBlueBorder hover:bg-customBlueRelease hover:text-white"
                      >
                        Fechar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 flex-col items-center">
                      <div className="flex flex-row gap-4">
                        {/* QR Code */}
                        <div
                          className="border border-green-600 p-4"
                          dangerouslySetInnerHTML={{ __html: qrCode }}
                        />
                        {/* Texto ao lado do QR Code */}
                        <div className="flex flex-col justify-between text-base">
                          <div className="flex flex-row h-1/5 items-center">
                            <div className="inline-block mr-2 text-4xl">
                              <GiSmartphone />
                            </div>
                            <div>
                              Abra o app do seu banco ou instituição financeira
                              e
                              <span className="text-slate-800 font-visby font-bold">
                                {" "}
                                entre no ambiente Pix.
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row h-1/5 items-center gap-2">
                            <div className="inline-block mr-1 ml-1 text-3xl">
                              <SiPix />
                            </div>
                            <div>
                              Escolha a opção
                              <span className="text-slate-800 font-visby font-bold">
                                {" "}
                                Pagar com QR Code.
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row h-1/5 items-center gap-1">
                            <div className="inline-block mr-2 text-4xl">
                              <BsQrCodeScan />
                            </div>
                            <div>
                              Aponte a câmera do seu celular e
                              <span className="text-slate-800 font-visby font-bold">
                                {" "}
                                escaneie o código ao lado.
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row h-1/5 items-center gap-1">
                            <div className="inline-block mr-2 text-4xl">
                              <GiConfirmed />
                            </div>
                            <div>
                              Confirme as informações e finalize o pagamento.
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Valor total abaixo do QR Code */}
                      <div className="mt-8 mb-6 text-2xl font-semibold font-visby">
                        Pague o valor total de: R${" "}
                        <span className="text-emerald-600 font-visby">
                          {totalCart.toFixed(2)}
                        </span>
                      </div>
                      {/* Botão Pix Copia e Cola */}
                      <div className="flex flex-row justify-between items-center border border-slate-800 w-full h-12 bg-slate-300 px-1">
                        {/* Código Pix visível */}
                        <div className="text-lg ml-5 text-gray-800 truncate w-3/5">
                          {copySuccess ? (
                            <span className="text-green-700">
                              {copySuccess}
                            </span>
                          ) : copyError ? (
                            <span className="text-red-700">{copyError}</span>
                          ) : (
                            "00020126680014BR.GOV.BCB.PIX0114+55119999999980201500165004BR00000000"
                          )}
                        </div>

                        {/* Botão */}
                        <button
                          onClick={handlePixCopyPaste}
                          className="bg-green-500 text-white px-2  py-2 rounded hover:bg-green-600 transition duration-300"
                        >
                          Pagar com Pix Copia e Cola
                        </button>
                      </div>
                      <button
                        onClick={() => setShowModal(false)} // Fecha o modal.
                        className="w-full  top-2 right-2 border p-4 font-bold text-xl border-customBlueBorder rounded-md text-customBlueBorder hover:bg-customBlueRelease hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {showInvoiceModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative w-[50%] h-[80vh] flex flex-col  gap-4">
                  <InvoiceComponent /> {/* Renderiza o componente da fatura */}
                  <button
                    onClick={() => setShowInvoiceModal(false)} // Fecha o modal
                    className="absolute top-2 right-2  text-red-500 hover:text-red-700"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-6/12 flex flex-col md:mt-0 md:ml-10">
            <div className="flex justify-between items-center mb-4 text-customBlueRelease">
              <h2 className="lg:text-3xl text-base font-bold text-preto font-visby">
                Resumo do Pedido:
              </h2>
              <FaEye className="ml-auto mt-1 mx-2 text-2xl" />
              {/* Aplicando os estilos para o texto "ver carrinho" */}
              <p
                onClick={goToCart}
                className="cursor-pointer hover:underline text-customBlueRelease self-center"
              >
                ver carrinho
              </p>
            </div>
            <Table />
            <button
              className="bg-customBlue text-white rounded p-2 mt-4 w-full flex items-center justify-center gap-2 px-6 py-3"
              onClick={handlePaymentClick}
            >
              <FaCheckCircle className="text-x1" />
              Finalizar minha Compra
            </button>
          </div>
        </div>
        <div className="md:justify-start mt-[2rem]">
          <h2 className=" text-preto lg:text-3xl md:text-xl font-semibold mb-8 text-start font-visby">
            Seus produtos:
          </h2>
          <ProductItem />
        </div>
      </div>

      <div>
        <CopyRight />
      </div>
    </div>
  );
}

export default Pagamento;
