// service/apiPix.js
const axios = require('axios');

// Configuração da instância Axios para a API Pix TecnoSpeed
const apiPix = axios.create({
  baseURL: 'https://pix.tecnospeed.com.br/sandbox',  // URL base da API Pix
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = apiPix;
