import React, { useEffect, useState } from "react";

const ProdutosEmPromocao = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products/oferta")
      .then(response => response.json())
      .then(data => setProdutos(data.data))
      .catch(error => console.error("Erro ao buscar produtos em oferta:", error));
  }, []);

  return (
    <div>
      <h1>Produtos em Promoção</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nome} - {produto.desconto}% de desconto
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutosEmPromocao;
