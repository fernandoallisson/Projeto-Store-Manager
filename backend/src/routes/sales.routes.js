const { Router } = require('express');
const { controleDeVendas } = require('../controllers');
const { 
  validarVendaPeloId,
  existeProduto,
  validarQuantidadeVendas,
  validarTamanhoVendas, 
} = require('../middlewares/validate.middlewares');

const rotaVendas = Router();

rotaVendas.get('/sales', controleDeVendas.getAll);
rotaVendas.get('/sales/:id', controleDeVendas.findById);
rotaVendas.post(
  '/sales',
  validarVendaPeloId,
  validarQuantidadeVendas,
  existeProduto,
  validarTamanhoVendas,
  controleDeVendas.create,
);
rotaVendas.put('/sales/:id', controleDeVendas.create);

module.exports = rotaVendas;
