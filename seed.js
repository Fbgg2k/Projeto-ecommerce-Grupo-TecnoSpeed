const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Inserindo um novo produto com infoTecnicas
  const novoProduto = await prisma.produto.create({
    data: {
      nome: "Tênis Esportivo ",
      preco: 8000,
      imagens: [
        "https://i.imgur.com/iDlolVv.png",
        "https://i.imgur.com/K6lBudo.png",
      ],
      desconto: 25,
      descricao: "Tênis para corrida e atividades físicas",
      cores: ["Azul", "Vermelho", "Preto", "Azul-Claro"],
      categoria: "Calçados",
      opcao: [
        { tamanho: "34", disponivel: true },
        { tamanho: "35", disponivel: true },
        { tamanho: "36", disponivel: true },
        { tamanho: "37", disponivel: false },
        { tamanho: "38", disponivel: true },
        { tamanho: "39", disponivel: false },
        { tamanho: "40", disponivel: true },
        { tamanho: "41", disponivel: true },
        { tamanho: "42", disponivel: true },
        { tamanho: "43", disponivel: false },
        { tamanho: "44", disponivel: true },
        { tamanho: "45", disponivel: true },
      ],
      infoTecnicas: [
        "Material: Mesh respirável.",
        "Sola: EVA com amortecimento.",
        "Tipo: Tênis de corrida.",
        "Tamanhos: Diversos tamanhos disponíveis.",
        "Fechamento: Cadarço.",
      ],
      infoAdicionais: [
        "Ideal para esportes e exercícios físicos.",
        "Design moderno e confortável.",
        "Boa ventilação e suporte ao pé.",
        "Leve e resistente.",
        "Disponível em várias cores vibrantes.",
      ],
      promocao: true,
    },
  });

  console.log("Produto criado:", novoProduto);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
