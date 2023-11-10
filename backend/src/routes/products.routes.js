const { Router } = require('express');
const { controleDeProdutos } = require('../controllers');
const { validarNomeProduto } = require('../middlewares/validate.middlewares');

const rotaProdutos = Router();

rotaProdutos.get('/products', controleDeProdutos.getAll);
rotaProdutos.get('/products/search', controleDeProdutos.searchProductsByName);
rotaProdutos.get('/products/:id', controleDeProdutos.findById);
rotaProdutos.post('/products', validarNomeProduto, controleDeProdutos.create);
rotaProdutos.put('/products/:id', validarNomeProduto, controleDeProdutos.update);
rotaProdutos.delete('/products/:id', controleDeProdutos.exclude);

module.exports = rotaProdutos;