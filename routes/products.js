// routes/products.js
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();
const { ObjectId } = require('mongodb');


// Função para remover acentos e caracteres especiais
function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para normalizar o nome do produto
function normalizarNome(nome) {
  return removerAcentos(nome).toLowerCase(); // Remove acentos e converte para minúsculas
}

// Rota para buscar produtos por nome
router.get('/busca', async (req, res) => {
  const nomeProduto = req.query.nome ? normalizarNome(req.query.nome) : '';
  console.log(`Buscando produto com o nome normalizado: "${nomeProduto}"`);

  try {
    // Busca produtos que contenham parte do nome sem normalização
    const produtos = await prisma.produto.findMany();

    // Normaliza e filtra os produtos no back-end
    const resultado = produtos.filter((produto) =>
      normalizarNome(produto.nome).includes(nomeProduto)
    ).slice(0, 5); // Limita a 5 produtos após a normalização

    if (resultado.length > 0) {
      console.log(`Busca por nome: "${nomeProduto}" retornou ${resultado.length} produtos.`);
      return res.status(200).json({ data: resultado });
    } else {
      console.log(`Busca por nome: "${nomeProduto}" retornou status 404 - Produto não encontrado.`);
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos por nome:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Rota para buscar geral produtos por nome
router.get('/busca/geral', async (req, res) => {
  const nomeProduto = req.query.nome ? normalizarNome(req.query.nome) : '';
  console.log(`Buscando produto com o nome normalizado: "${nomeProduto}"`);

  try {
    // Busca produtos que contenham parte do nome sem normalização
    const produtos = await prisma.produto.findMany();

    // Normaliza e filtra os produtos no back-end
    const resultado = produtos.filter((produto) =>
      normalizarNome(produto.nome).includes(nomeProduto)
    ).slice(0, 100); // Limita a 5 produtos após a normalização


    if (resultado.length > 0) {
      console.log(`Busca por nome: "${nomeProduto}" retornou ${resultado.length} produtos.`);
      return res.status(200).json({ data: resultado });
    } else {
      console.log(`Busca por nome: "${nomeProduto}" retornou status 404 - Produto não encontrado.`);
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos por nome:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});


// Rota para listar novidades (últimos 28 produtos cadastrados)
router.get('/novidades', async (req, res) => {
  try {
    const novidades = await prisma.produto.findMany({
      take: 28,
      orderBy: {
        createdAt: 'desc', // Ordena pela data de criação em ordem decrescente (últimos cadastrados)
      },
    });
    console.log(`Busca de novidades retornou ${novidades.length} produtos.`);
    res.status(200).json({ data: novidades });
  } catch (error) {
    console.error("Erro ao buscar novidades:", error);
    res.status(500).json({ error: "Erro ao buscar novidades." });
  }
});



// Rota para retornar todos os produtos para testes
router.get('/', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();

    if (produtos.length > 0) {
      console.log(`Listagem de todos os produtos retornou ${produtos.length} produtos.`);
      return res.status(200).json({ data: produtos });
    } else {
      console.log('Listagem de todos os produtos retornou status 404 - Nenhum produto disponível.');
      return res.status(404).json({ message: 'Nenhum produto disponível' });
    }
  } catch (error) {
    console.error('Erro ao listar todos os produtos:', error);
    return res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
});

// Rota para buscar produtos por categoria

router.get('/categoria/:categoria', async (req, res) => {

  const { categoria } = req.params;
  console.log(`Buscando produtos na categoria: ${categoria}`);

  try {
    const produtos = await prisma.produto.findMany({
      where: {
        categoria: {
          equals: categoria,
          mode: 'insensitive'
        }
      }
    });

    if (produtos.length > 0) {
      console.log(`Busca na categoria "${categoria}" retornou ${produtos.length} produtos.`);
      return res.status(200).json({ data: produtos });
    } else {
      console.log(`Busca na categoria "${categoria}" retornou status 404 - Nenhum produto encontrado.`);
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Rota para buscar produto por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Buscando produto com ID: ${id}`);

  if (!ObjectId.isValid(id)) {
    console.log(`ID "${id}" é inválido. Retornando status 400.`);
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const produto = await prisma.produto.findUnique({
      where: { id }
    });

    if (produto) {
      console.log(`Produto com ID "${id}" encontrado.`);
      res.status(200).json({ data: produto });
    } else {
      console.log(`Produto com ID "${id}" não encontrado. Retornando status 404.`);
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
});


router.get('/ofertas', async (req, res) => {
  console.log('Iniciando busca de produtos em promoção');
  try {
    const produtosPromocao = await prisma.produto.findMany({
      where: {
        promocao: true
      }
    });

    console.log(`Resultado da busca de promoções: ${produtosPromocao.length} produtos encontrados.`);

    if (produtosPromocao.length > 0) {
      return res.status(200).json({ data: produtosPromocao });
    } else {
      return res.status(404).json({ message: 'Nenhum produto em promoção encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos em promoção:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos em promoção.' });
  }
});

// Rota para buscar produtos com base em um termo de pesquisa

router.get('/busca', async (req, res) => {
  const { nome } = req.query;

  if (!nome) {
    return res.status(400).json({ message: 'Por favor, forneça um termo de busca.' });
  }

  try {
    // Consulta ao banco para buscar produtos por nome, categoria ou descrição
    const produtos = await req.prisma.produto.findMany({
      where: {
        OR: [
          { nome: { contains: nome, mode: 'insensitive' } },
          { categoria: { contains: nome, mode: 'insensitive' } },
          { descricao: { contains: nome, mode: 'insensitive' } },
        ],
      },
    });


    if (produtosPromocao.length > 0) {
      return res.status(200).json({ data: produtosPromocao });
    } else {
      return res.status(404).json({ message: 'Nenhum produto em promoção encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos em promoção:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos em promoção.' });
  }
});

module.exports = router;