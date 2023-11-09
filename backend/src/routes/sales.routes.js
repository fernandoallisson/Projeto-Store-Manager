const { Router } = require('express');
const { controleDeVendas } = require('../controllers');
const { 
  validarVendaPeloId,
  existeProduto,
  validarQuantidadeVendas,
  validarTamanhoVendas, 
} = require('../middlewares/validate.middlewares');
const {
  validarCampoProductId,
  validarCampoQuantidade,
  validarTamanhoCampoQuantidade,
  validarVendasPeloId,
} = require('../middlewares/validateSales.middlewares');

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
rotaVendas.delete(
  '/sales/:id',
  controleDeVendas.exclude,
);
rotaVendas.put(
  '/sales/:saleId/products/:productId/quantity',
  validarTamanhoCampoQuantidade,
  validarCampoQuantidade,
  validarCampoProductId,
  validarVendasPeloId,
  controleDeVendas.update,
);

module.exports = rotaVendas;
