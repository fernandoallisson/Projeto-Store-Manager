const { Router } = require('express');
const { controleDeVendas } = require('../controllers');
const { 
  validarVendaPeloId,
  existeProduto,
  validarNomeProduto,
  validarQuantidadeVendas,
} = require('../middlewares/validate.middlewares');

const rotaVendas = Router();

rotaVendas.get('/sales', controleDeVendas.getAll);
rotaVendas.get('/sales/:id', controleDeVendas.findById);
rotaVendas.post(
  '/sales',
  validarQuantidadeVendas,
  existeProduto,
  validarNomeProduto,
  validarVendaPeloId,
  controleDeVendas.create,
);
rotaVendas.put('/sales/:id', controleDeVendas.update);
rotaVendas.delete('/sales/:id', controleDeVendas.remove);

module.exports = rotaVendas;
