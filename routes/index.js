// routes/index.js
const express = require('express');
const router = express.Router();
const products = require('./products');
const notas = require('./notas');
const pixRoutes = require('./pixRoutes');
const userRoutes = require('./userRoutes');


// Define o prefixo /produtos para as rotas do arquivo products.js
router.use('/produtos', products); 
router.use('/notas', notas);
router.use('/pix', pixRoutes);
router.use('/cadastro', userRoutes);
router.use('/usuarios', userRoutes);

module.exports = router;