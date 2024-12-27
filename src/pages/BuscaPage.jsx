import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function BuscaPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("nome") || "";
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Realiza a requisição para o backend com o termo de busca
    fetch(`http://localhost:3000/produtos/busca?nome=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Atualiza o estado com os produtos retornados
        setProdutos(data);
        console.log("Produtos encontrados:", data); // Para verificar no console
      })
      .catch((error) => console.error("Erro na busca:", error));
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Resultados da busca para: "{searchTerm}"
      </h2>
      {produtos.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition"
            >
              <img
                src={produto.imagens?.[0]} // Exibe a primeira imagem do produto
                alt={produto.nome}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
              <p className="text-gray-600 mb-2">{produto.descricao}</p>
              <p className="text-gray-800 font-bold">
                Preço: R$ {produto.preco?.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}

export default BuscaPage;
