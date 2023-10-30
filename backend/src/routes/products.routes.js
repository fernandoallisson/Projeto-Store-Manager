const { Router } = require('express');
const { controleDeProdutos } = require('../controllers');

const rotaProdutos = Router();

rotaProdutos.get('/products', controleDeProdutos.getAll);
rotaProdutos.get('/products/:id', controleDeProdutos.findById);
rotaProdutos.post('/products', controleDeProdutos.create);
rotaProdutos.put('/products/:id', controleDeProdutos.update);

module.exports = rotaProdutos;