import React, { createContext, useState, useMemo } from "react";

// Criando o contexto de loja
export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem("cartItems");
    try {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : []; // Garantir que seja um array
    } catch {
      return []; // Valor padrão se o JSON estiver inválido
    }
  };

  // Estado de produtos completos (não só os do carrinho)
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  // Função para adicionar produtos ao carrinho
  const addToCart = (produto) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === produto.id &&
          item.tamanho === produto.tamanho &&
          item.cor === produto.cor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const newItem = { ...produto, quantity: 1 };
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };


  // Função para remover produtos do carrinho
  const removeFromCart = (produto) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (
          item.id === produto.id &&
          item.tamanho === produto.tamanho &&
          item.cor === produto.cor
        ) {
          // Se a quantidade for maior que 1, diminui a quantidade
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Se a quantidade for 1, remove o item
            return null;
          }
        }
        return item;
      }).filter(Boolean); // Remove itens null (quando o produto deve ser excluído)

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Função para atualizar a quantidade de um item no carrinho
  const updateCartItemCount = (count, produto) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === produto.id &&
          item.tamanho === produto.tamanho &&
          item.cor === produto.cor
          ? { ...item, quantity: count }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Cálculo do subtotal do carrinho
  const subtotalCart = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const quantidade = Number(item.quantity);
      const preco = Number(item.preco);

      if (!isNaN(preco) && !isNaN(quantidade)) {
        return acc + preco * quantidade;
      }

      return acc;
    }, 0);
  }, [cartItems]);

  // ** Função para limpar o carrinho **
  const clearCart = () => {
    setCartItems([]); // Limpa o estado
    localStorage.removeItem("cartItems"); // Remove do localStorage
  };


  const totalCart = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const quantidade = Number(item.quantity);
      const preco = Number(item.preco);
      const descontoPercentual = Number(item.desconto || 0); // Garante que seja 0 se não houver desconto
      const promocao = item.promocao; // Verifica se o produto está em promoção

      if (!isNaN(preco) && !isNaN(quantidade)) {
        // Calcula o preço do item com ou sem desconto
        const precoFinal = promocao && descontoPercentual > 0
          ? preco * (1 - descontoPercentual / 100) // Aplica o desconto, se em promoção
          : preco; // Sem desconto se não estiver em promoção

        return acc + precoFinal * quantidade;
      }

      return acc;
    }, 0);
  }, [cartItems]);


  // Função para contar o número total de itens no carrinho
  const getTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        subtotalCart,
        totalCart,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
