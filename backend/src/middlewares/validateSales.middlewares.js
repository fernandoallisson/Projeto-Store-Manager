const products = require('../models/product.model');
const sales = require('../models/sales.model');

// Será validado que não é possível realizar alterações em uma venda sem o campo quantity;
const validarCampoQuantidade = async (req, res, next) => { // TESTADA
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

// Será validado que não é possível realizar alterações em uma venda com o campo quantity menor ou igual a 0 (Zero)
const validarTamanhoCampoQuantidade = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

// Será validado que não é possível realizar alterações em uma venda com productId inexistente;
const validarCampoProductId = async (req, res, next) => { // TESTADA
  const { productId } = req.params;
  const product = await products.findById(productId);
  if (!product || product.length === 0) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }
  next();
};

// Será validado que não é possível alterar uma venda que não existe;
const validarVendasPeloId = async (req, res, next) => { // TESTADA
  const { id } = req.params;
  const sale = await sales.findById(id);
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

module.exports = {
  validarCampoQuantidade,
  validarTamanhoCampoQuantidade,
  validarCampoProductId,
  validarVendasPeloId,
};