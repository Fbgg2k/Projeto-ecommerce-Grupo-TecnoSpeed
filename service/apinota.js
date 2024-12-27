const axios = require('axios');

const PLUGNOTAS_API_URL = process.env.PLUGNOTAS_API_URL || 'https://api.sandbox.plugnotas.com.br';
const API_KEY = process.env.PLUGNOTAS_API_KEY;

const apiNotas = axios.create({
    baseURL:PLUGNOTAS_API_URL,
    headers:{
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json',
    }
})

module.exports = apiNotas
