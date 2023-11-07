const product = require('../models/product.model');

const validarNomeProduto = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validarVendaPeloId = async (req, res, next) => { // TESTADA
  let erro = false;
  const vendas = req.body;

  await vendas.forEach((element) => {
    if (!element.productId || element.productId === '') {
      erro = true;
    }
  });

  if (erro) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validarQuantidadeVendas = async (req, res, next) => { // TESTADA
  let erro = false;
  const vendas = req.body;

  await vendas.forEach((element) => {
    if (!element.quantity && element.quantity !== 0) {
      erro = true;
    }
  });

  if (erro) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validarTamanhoVendas = async (req, res, next) => {
  let erro = false;
  const vendas = req.body;
  await vendas.forEach((element) => {
    if (element.quantity < 1) {
      erro = true;
    }
  });

  if (erro) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const existeProduto = async (req, res, next) => {
  const array = [];
  const promessa = req.body.map(async (elemento) => {
    const produto = await product.findById(elemento.productId);
    array.push(produto);
  });
  await Promise.all(promessa);

  for (let i = 0; i < array.length; i += 1) {
    if (!array[i]) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }
  next();
};

module.exports = {
  validarNomeProduto,
  validarVendaPeloId,
  validarQuantidadeVendas,
  validarTamanhoVendas,
  existeProduto,
};
