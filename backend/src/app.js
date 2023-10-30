const express = require('express');
const rotaProdutos = require('./routes/products.routes');
const rotaVendas = require('./routes/sales.routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar corretamente
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(rotaProdutos);
app.use(rotaVendas);

module.exports = app;
