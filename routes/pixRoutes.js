// routes/pixRoutes.js
const express = require('express');
const apiPix = require('../service/apiPix');
const router = express.Router();

// Rota para criar uma cobrança Pix
router.post('/charge', async (req, res) => {
  const payload = {
    accountId: req.body.accountId,
    description: req.body.description,
    tags: req.body.tags,
    calendar: {
      dueDate: req.body.calendar.dueDate,
      daysAfterDueDate: req.body.calendar.daysAfterDueDate,
    },
    payer: {
      cpfCnpj: req.body.payer.cpfCnpj,
      name: req.body.payer.name,
      email: req.body.payer.email,
      street: req.body.payer.street,
      city: req.body.payer.city,
      state: req.body.payer.state,
      zipcode: req.body.payer.zipcode,
    },
    value: {
      original: req.body.value.original,
      fine: req.body.value.fine,
      interest: req.body.value.interest,
      reduction: req.body.value.reduction,
      discount: req.body.value.discount,
    },
    aditionalInformation: req.body.aditionalInformation,
  };

  try {
    const response = await apiPix.post('/pix/charge', payload);  // Faz a requisição com o Axios configurado
    res.status(201).json(response.data);  // Resposta de sucesso
    const now = new Date();
    console.log(`Pix com vencimento criado com sucesso em ${now.toLocaleString('pt-BR')}.`);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const now = new Date();
      console.log(`Falha na criação do pix com vencimento em ${now.toLocaleString('pt-BR')}:`, error.response.data);
      return res.status(422).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Erro no servidor' });
    }
  }
});

// Rota para criar um PIX Dinâmico
router.post('/dynamic', async (req, res) => {
  const payload = {
    accountId: req.body.accountId,  // UUID da conta (informado pelo cliente)
    description: req.body.description,  // Descrição da cobrança
    tags: req.body.tags,  // Tags (listas de strings)
    amount: req.body.amount,  // Valor total da cobrança
    duration: req.body.duration,  // Duração do pagamento em segundos
    payerName: req.body.payerName,  // Nome do pagador
    payerCpfCnpj: req.body.payerCpfCnpj,  // CPF ou CNPJ do pagador
    aditionalInformation: req.body.aditionalInformation,  // Informações adicionais a serem mostradas ao pagador
  };

  try {
    // Faz a requisição para a API do TecnoSpeed
    const response = await apiPix.post('/pix/dynamic', payload);
    res.status(201).json(response.data);  // Resposta de sucesso com os dados da cobrança criada
    // Obter a data e hora atual
    const now = new Date();
    console.log(`Pix dinâmico criado com sucesso em ${now.toLocaleString('pt-BR')}.`);  // Inclui data e horário no log
  } catch (error) {
    if (error.response && error.response.status === 422) {  
      const now = new Date();  
      console.log(`Falha na criação do pix dinâmico em ${now.toLocaleString('pt-BR')}:`, error.response.data);
      return res.status(422).json(error.response.data);  // Apenas repassa o erro 422
    } else {
      res.status(500).json({ error: 'Erro no servidor' });  // Erro genérico para falhas de servidor
    }
  }
});

// Rota para consultar o pix pelo id
router.get('/consulta/:id', async (req, res) => {
  const { id } = req.params;  // Extrai o 'id' da URL

  try {
    // Faz a requisição para a API da TecnoSpeed para consultar o pix gerado com o 'id' da cobrança
    const response = await apiPix.get(`/pix/${id}`);

    // Caso não encontre a cobrança, retorna um erro 404
    if (!response.data) {
      console.log(`Erro 404: Cobrança Pix com ID ${id} não encontrada.`);
      return res.status(404).json({ error: 'Cobrança Pix não encontrada' });
    }

    // Retorna a resposta da API TecnoSpeed
    res.status(200).json(response.data);

    // Logando o sucesso da consulta com a data e hora
    const now = new Date();
    console.log(`Consulta pix realizada com sucesso em ${now.toLocaleString('pt-BR')}. Tipo do pix:`, response.data.kind);

  } catch (error) {
    const status = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Erro ao consultar pix';

    // Verifica se o status é 404 (Not Found)
    if (status === 404) {
      console.log(`Erro 404: Cobrança Pix com ID ${id} não encontrada.`);
      return res.status(404).json({ error: 'Cobrança Pix não encontrada' });
    }

    // Logando outros erros
    console.log(`Erro ${status}: ${errorMessage}`);
    res.status(status).json({ error: errorMessage });
  }
});

// Rota para gerar um QR Code
router.get('/qr/:id', async (req, res) => {
  const { id } = req.params;  // Extrai o 'id' da URL

  try {
    // Faz a requisição para a API da TecnoSpeed para consultar o pix gerado com o 'id' da cobrança
    const response = await apiPix.get(`/qr/${id}`);

    // Caso não encontre a cobrança, retorna um erro 404
    if (!response.data) {
      console.log(`Erro 404: Cobrança Pix por QR Code com ID ${id} não encontrada.`);
      return res.status(404).json({ error: 'Cobrança Pix por QR Code não encontrada' });
    }

    // Retorna a resposta da API TecnoSpeed
    res.status(200).json(response.data);

    // Logando o sucesso da consulta com a data e hora
    const now = new Date();
    console.log(`Cobrança Pix por QR Code realizada com sucesso em ${now.toLocaleString('pt-BR')}. Tipo do pix:`, response.data.kind);

  } catch (error) {
    const status = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Erro ao consultar QR Code';

    // Verifica se o status é 404 (Not Found)
    if (status === 404) {
      console.log(`Erro 404: Cobrança Pix por QR com ID ${id} não encontrada.`);
      return res.status(404).json({ error: 'Cobrança Pix Pix por QR não encontrada' });
    }

    // Logando outros erros
    console.log(`Erro ${status}: ${errorMessage}`);
    res.status(status).json({ error: errorMessage });
  }
});


module.exports = router;
