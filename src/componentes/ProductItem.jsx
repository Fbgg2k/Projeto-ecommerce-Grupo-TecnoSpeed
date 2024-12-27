import React, { useState, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ShopContext } from "../context/shop-context";
import { useNavigate } from 'react-router-dom';

function ProductItem() {
  const { cartItems, removeFromCart, updateCartItemCount, addToCart } = useContext(ShopContext);
  const [showTrash, setShowTrash] = useState(null); // Agora armazena um objeto (id, cor, tamanho)
  const navigate = useNavigate();

  const goToPageProduct = (id) => {
    navigate(`/produto/${id}`);
  };

  

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="w-2/5 p-2"></th>
          <th className="w-1/5 text-start md:text-base lg:text-lg">Quantidade</th>
          <th className="w-1/5 text-center md:text-base lg:text-lg">Valor Unitário</th>
          <th className="w-1/5 text-end md:text-base lg:text-lg">Valor Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((produto) => {
          const precoComDesconto = produto.promocao
            ? produto.preco * (1 - produto.desconto / 100)
            : produto.preco;

          const valorTotal = precoComDesconto * produto.quantity;

          return (
            <tr key={`${produto.id}-${produto.tamanho}-${produto.cor}`}>
              <td className="md:w-1/4 lg:w-2/8">
                <div className="flex items-center ">
                  <div className="bg-gray-200 flex mb-8">
                    <img
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      className="h-[13rem] w-[14rem] cursor-pointer"
                      onClick={() => goToPageProduct(produto.id)}
                    />
                  </div>
                  <div className="md:w-1/3 lg:w-2/5 flex-row">
                    <p className="md:mx-5 lg:mx-5 w-full font-extrabold  text-wrap md:text-sm lg:text-xl">
                      {produto.nome}
                    </p>
                    <p className="md:mx-5 lg:mx-5 mt-2 w-full font-extrabold text-wrap md:text-xs lg:text-base">
                      Tamanho: {produto.tamanho}
                    </p>
                    <p className="md:mx-5 lg:mx-5 mb-6 w-full font-extrabold text-wrap md:text-xs lg:text-base">
                      Cor: {produto.cor}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-start items-center">
                  <button
                    className="w-8 h-8 text-customBlueRelease border-2 border-customBlueBorder rounded-sm flex items-center justify-center"
                    onMouseEnter={() =>
                      setShowTrash({
                        id: produto.id,
                        cor: produto.cor,
                        tamanho: produto.tamanho,
                      })
                    }
                    onMouseLeave={() => setShowTrash(null)}
                    onClick={() => removeFromCart(produto)}
                    aria-label="Remover item do carrinho"
                  >
                    {showTrash &&
                    showTrash.id === produto.id &&
                    showTrash.cor === produto.cor &&
                    showTrash.tamanho === produto.tamanho ? (
                      <FaTrashAlt className="w-5 h-5" />
                    ) : (
                      "-"
                    )}
                  </button>
                  <input
                    type="text"
                    value={produto.quantity}
                    onChange={(e) =>
                      updateCartItemCount(
                        Math.max(0, Number(e.target.value)),
                        produto
                      )
                    }
                    className="w-8 h-8 text-customBlueRelease border-t-2 border-b-2 border-customBlueBorder text-center"
                    min="0"
                    aria-label="Quantidade"
                  />
                  <button
                    className="w-8 h-8 text-customBlueRelease border-2 border-customBlueBorder rounded-sm flex items-center justify-center"
                    onClick={() => addToCart(produto)}
                    aria-label="Adicionar item ao carrinho"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="text-center">
                {produto.promocao && (
                  <p className="text-xs font-visby text-customGray line-through">
                    Era: R$ {produto.preco.toFixed(2)}
                  </p>
                )}
                <p className="mt-1 text-customBlueRelease font-bold text-xl">
                  R$ {precoComDesconto.toFixed(2)}
                </p>
              </td>
              <td className="text-end">
                <p className="mt-1 text-customBlueRelease font-bold text-xl">
                  R$ {valorTotal.toFixed(2)}
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductItem;
