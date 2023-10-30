const express = require('express');
const { rotaProdutos, rotaVendas } = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar corretamente
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(rotaProdutos);
app.use(rotaVendas);

module.exports = app;
