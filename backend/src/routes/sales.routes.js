const { Routes } = require('express');
const { controleDeVendas } = require('../controllers');

const rotaVendas = Routes();

rotaVendas.get('/sales', controleDeVendas.getAll);
rotaVendas.get('/sales/:id', controleDeVendas.findById);
rotaVendas.post('/sales', controleDeVendas.create);
rotaVendas.put('/sales/:id', controleDeVendas.update);
rotaVendas.delete('/sales/:id', controleDeVendas.exclude);

module.exports = rotaVendas;

// Colocar as validalções dos middlewares