import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdutosPorCategoria = ({ categoria }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${categoria}`)
      .then(response => {
        setProdutos(response.data.data);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [categoria]);

  return (
    <div>
      <h1>Produtos da categoria: {categoria}</h1>
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

export default ProdutosPorCategoria;
