const { Router } = require('express');
const { controleDeVendas } = require('../controllers');

const rotaVendas = Router();

rotaVendas.get('/sales', controleDeVendas.getAll);
rotaVendas.get('/sales/:id', controleDeVendas.getById);
rotaVendas.post('/sales', controleDeVendas.create);
rotaVendas.put('/sales/:id', controleDeVendas.update);
rotaVendas.delete('/sales/:id', controleDeVendas.exclude);

module.exports = rotaVendas;

// Colocar as validalções dos middlewares