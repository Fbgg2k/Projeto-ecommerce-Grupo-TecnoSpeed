const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Instância do Prisma Client
const prisma = new PrismaClient();

// Função utilitária para lidar com erros de servidor
const handleError = (res, error, message = 'Erro no servidor') => {
    console.error(message, error);
    res.status(500).json({ success: false, message });
};

// Função para validar campos obrigatórios
const validateFields = (fields, res) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            res.status(400).json({ success: false, message: `Campo obrigatório: ${key}` });
            return false;
        }
    }
    return true;
};

// POST - Criar um novo usuário
router.post('/', async (req, res) => {
    const { nome, cpf, email, endereco, numero, cidade, estado, cep, senha } = req.body;

    if (!validateFields({ nome, email, senha }, res)) return;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: { nome, cpf, email, endereco, numero, cidade, estado, cep, senha: hashedPassword },
        });

        res.status(201).json({ success: true, usuario: novoUsuario });
    } catch (error) {
        handleError(res, error, 'Erro ao cadastrar usuário');
    }
});

// GET - Buscar todos os usuários
router.get('/', async (_req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json({ success: true, usuarios });
    } catch (error) {
        handleError(res, error, 'Erro ao buscar usuários');
    }
});

// GET - Buscar usuário pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        res.status(200).json({ success: true, usuario });
    } catch (error) {
        handleError(res, error, 'Erro ao buscar usuário');
    }
});

// PUT - Atualizar usuário pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, endereco, numero, cidade, estado, cep } = req.body;

    try {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: Number(id) },
            data: { nome, cpf, email, endereco, numero, cidade, estado, cep },
        });

        res.status(200).json({ success: true, usuario: usuarioAtualizado });
    } catch (error) {
        handleError(res, error, 'Erro ao atualizar usuário');
    }
});

// DELETE - Deletar usuário pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.usuario.delete({ where: { id: id } });
        res.status(200).json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (error) {
        handleError(res, error, 'Erro ao deletar usuário');
    }
});


// POST - Autenticar um usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!validateFields({ email, senha }, res)) return;

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Senha incorreta' });
        }

        res.status(200).json({ success: true, message: 'Login bem-sucedido', usuario });
    } catch (error) {
        handleError(res, error, 'Erro no login');
    }
});

module.exports = router;
