import { useEffect, useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShareAlt, FaShoppingCart } from "react-icons/fa";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import CadastroFooter from "../componentes/CadastroFooter";
import CopyRight from "../componentes/CopyRight";
import Carousel from "../componentes/Carousel";
import ProductRating from "../componentes/ProductRating";
import ColorDots from "../componentes/ColorDots";
import ListaProdutos from "../componentes/ListaProdutos";
import SizeSelector from "../componentes/SizeSelector";
import ProductGallery from "../componentes/ProductGallery";
import Magnifier from "../componentes/Magnifier";
import ProductDetail from "../componentes/ProductDetail";
import ProductTDetail from "../componentes/ProductTDetail";
import Avaliacoes from "../componentes/Avaliacoes";
import formatacaoDinheiro from "../utils/formatacaoDinheiro";
import RatingSpecial from "../componentes/RatingSpecial";
import RatingDistribution from "../componentes/RatingDistribution";
import { ShopContext } from "../context/shop-context";
import api from "../services/api";

function Product() {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const [mainImage, setMainImage] = useState("");
  const mainImageRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const cartItemCount = produto ? cartItems.find(
    (item) => 
      item.id === produto.id &&
      item.tamanho === selectedSize && // Use selectedSize para comparação
      item.cor === selectedColor // Use selectedColor para comparação
  )?.quantity || 0 : 0; 

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecione o tamanho e a cor.');
      return;
    }

    const productToCart = {
      ...produto,
      tamanho: selectedSize,
      cor: selectedColor,
    };

    addToCart(productToCart);
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/produtos/id/${id}`);
        setProduto(response.data.data); // Acessando o produto dentro da propriedade "data"
        if (response.data.data.imagens) {
          setMainImage(response.data.data.imagens[0]); // Definindo a primeira imagem como principal
        }
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProduto();
  }, [id]);


  const handleThumbnailClick = (imagem) => {
    if (mainImageRef.current) {
      mainImageRef.current.src = imagem;
      setMainImage(imagem);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <p></p>
    </div>; // Indicador de carregamento
  }

  if (!produto) {
    return <div className="flex justify-center items-center h-screen">
      <p>Produto não encontrado ! ! !</p>
    </div>; // Somente exibe se o produto realmente não existir
  }

  return (
    <div className="relative">
      <main>
        <div>
          <Header />
          <Carousel />
        </div>
        <div className="px-16 sm:px-8">
          <div className="container flex flex-col p-8 gap-4 mb-8">
            <div className="flex flex-row gap-7 mb-4 mt-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-items-start text-[#535F70] lg:gap-2 lg:mt-6 lg:mb-6 lg:text-lg sm:text-sm sm:mb-2 sm:mt-2">
                  <Link to="/" className="hover:underline">Inicial</Link>
                  <p>/</p>
                  <p>{produto.categoria} /</p>
                  <p className="font-extra-bold ">{produto.descricao}</p>
                </div>
                <div className="flex lg:flex-row md:flex-row sm:flex-col">
                  <div>
                    <Magnifier
                      ref={mainImageRef}
                      src={mainImage}
                      alt="Produto sem foto"
                      className="image-cover sm:w-[32rem] sm:h-[30rem] md:w-[27rem] md:h-[25rem] lg:w-[50.5rem] lg:h-[46.875rem]"
                      lensSize={150}
                    />
                    <div className="flex-1 mt-2">
                      <ProductGallery
                        imagens={produto.imagens}
                        onThumbnailClick={handleThumbnailClick}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between lg:pl-14 md:pl-4 sm:pl-0 sm:w-full sm:h-3/3 md:w-1/2 md:h-full lg:w-1/3 lg:h-[84.5%]">
                    <div className="w-full">
                      <p className="font-semibold text-start text-red-500 lg:text-lg md:text-xs sm:text-lg lg:mt-2 md:mt-0 sm:mt-2">Atenção! Últimas unidades</p>
                      <p className="font-black text-azulClaro lg:mt-2 md:mt-0 sm:mt-2 lg:text-4xl md:text-xl sm:text-3xl">{produto.nome}</p>
                      <p className="text-preto lg:text-sm md:text-xs sm:text-xs font-normal lg:mt-2 md:mt-0 sm:mt-2 underline">Ver mais detalhes</p>
                      <p className="text-preto text-xs font-normal lg:mt-5 md:mt-2 sm:mt-5 underline">32 Avaliações</p>
                      <ProductRating className="inline-block" />
                    </div>
                    <div className="flex-cols">
                      <p className="line-through font-bold lg:text-lg md:text-sm sm:text-2x1 text-[#73777F]">
                        Era: {formatacaoDinheiro(produto.preco)}
                      </p>
                      <h1 className="flex font-extra-bold lg:text-4xl md:text-2xl sm:text-3xl text-azulClaro">
                        {formatacaoDinheiro(
                          produto.preco - produto.preco * (produto.desconto / 100)
                        )}
                      </h1>
                      <p className="lg:text-lg md:text-sm sm:text-lg text-azulClaro mt-1">Em até 10x sem juros</p>
                    </div>
                    <div>
                      <p className="grid lg:text-lg md:text-sm sm:text-lg text-preto lg:mt-5 md:mt-2 sm:mt-5 items-center mb font-bold">Cores / Opções disponíveis:</p>
                      <ColorDots 
                        produtoId={produto.id} 
                        cores={produto.cores}
                        onColorSelect={setSelectedColor} />
                    </div>
                    <div className="lg:w-3/4 md:w-60 sm:w-3/4">
                      <SizeSelector  
                        produtoId={produto.id}
                        opcoes={produto.opcao}
                        categoria={produto.categoria}
                        onSizeSelect={setSelectedSize} />
                    </div>
                    <div className="lg:mt-10 md:mt-2 sm:mt-10">
                      <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-[#001D36] text-white lg:h-11 md:h-8 sm:h-11 lg:px-14 md:px-4 sm:px-14 py-2.5 rounded lg:hover:bg-cyan-600 focus:outline-none lg:focus:ring-2 focus:ring-cyan-400"
                      >
                        <FaShoppingCart />
                        Adicionar ao Carrinho {cartItemCount > 0 && <> ({cartItemCount})</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row sm:flex-col">
            <div className="font-normal lg:w-1/2 md:w-1/2 sm:w-full text-preto2">
              <p className="font-extrabold text-2xl text-preto mx-9 mt-4">Detalhes do Produto:</p>
              <ProductDetail produto={produto} />
            </div>
            <div className="font-normal lg:mx-6 lg:pl-14 md:w-2/5 sm:mx-9 sm:mb-4">
              <p className="font-italic font-extra-bold text-2xl text-preto2 lg:mx-6 md:mx-8 sm:mx-0 mt-4">Ficha Técnica:</p>
              <ProductTDetail produto={produto} />
            </div>
          </div>
          <div className="lg:p-4 md:p-4 sm:p-0 flex lg:flex-row md:flex-row sm:flex-col">
            <div className="lg:pl-0 md:pl-0 sm:pl-7 col-span-1 md:col-span-1">
              <p className="font-extra-bold text-2xl text-start text-preto mx-4 lg:pl-1 md:pl-1 sm:pl-0">Avaliações:</p>
              <RatingSpecial />
              <RatingDistribution />
            </div>
            <div className="col-span-1 md:col-span-5 px-12 flex flex-col mt-2 justify-between">
              <Avaliacoes />
            </div>
          </div>
          <div className="text-center space-x-2 mx-10 font-bold text-preto mt-10 text-3xl">Você também pode gostar de:</div>
          <div className="p-6 text-preto2 text-xl">
            <ListaProdutos />
          </div>
        </div>
        <div>
          <CadastroFooter />
          <Footer />
          <CopyRight />
        </div>
      </main>
      <div className="absolute lg:right-14 lg:top-[34.3rem] lg:p-1 bg-white border-gray-300 border-2 rounded-full lg:w-12 lg:h-12 hover:bg-[#001D36] hover:text-white">
        <FaShareAlt className="lg:w-8 lg:h-8 lg:ml-1 lg:mt-1 lg:text-black hover:text-white" />
      </div>
    </div>
  );
}

export default Product;
