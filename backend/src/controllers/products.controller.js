const { produtosService } = require('../services');

const getAll = async (_req, res) => {
  const { products } = await produtosService.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const products = await produtosService.findById(id);

  if (products.status === 'NOT_FOUND') {
    return res.status(404).json(products.products);
  }

  res.status(200).json(products);
};

const create = async (req, res) => {
  const { name } = req.body;

  const products = await produtosService.create(name);

  res.status(201).json(products.products);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const products = await produtosService.update(id, name);

  if (products.status === 'NOT_FOUND') {
    return res.status(404).json(products.products);
  }

  res.status(200).json(products.products);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  const products = await produtosService.exclude(id);

  if (products.status === 'NOT_FOUND') {
    return res.status(404).json(products.products);
  }

  res.status(200).json(products.products);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};