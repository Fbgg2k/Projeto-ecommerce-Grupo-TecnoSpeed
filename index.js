const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Importa o Prisma Client
const dotenv = require('dotenv'); // Importa dotenv para variáveis de ambiente
const router = require('./routes'); // Importa o roteador principal



dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
const prisma = new PrismaClient(); // Inicializa o Prisma Client

// Middleware para uso do Prisma em todas as rotas
app.use(async (req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use(cors());
app.use(express.json()); // Middleware para parsing JSON

// Usa as rotas principais
app.use('/', router);

// Middleware de fallback para rotas inexistentes (404)
app.use((req, res) => {
  return res.status(404).json({ status: 'error', message: `Rota não encontrada: ${req.path}` });
});

// Rota de status
app.get('/status', (req, res) => {
  return res.status(200).json({ status: 'ok', message: 'Servidor está rodando corretamente!' });
});

const PORT = 3000;

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar conexão com o Prisma corretamente ao encerrar o servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
