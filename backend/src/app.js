const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar corretamente
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
