const { produtosService } = require('../services');

const getAll = async (_req, res) => { // TESTADA
  const { products } = await produtosService.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => { // TESTADA
  const { id } = req.params;

  const products = await produtosService.findById(id);
  if (products.status === 'NOT_FOUND') {
    return res.status(404).json(products.products);
  }

  res.status(200).json(products.item);
};

const create = async (req, res) => { // TESTADA
  const { name } = req.body;

  const products = await produtosService.create(name);

  await res.status(201).json(products.item);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await produtosService.update(id, name);

  if (product.status === 'NOT_FOUND') {
    return res.status(404).json({ message: product.message });
  }

  res.status(200).json(product.product);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  const products = await produtosService.exclude(id);

  if (products.status === 'NOT_FOUND') {
    return res.status(404).json({ message: products.message });
  }

  // Produto excluído com sucesso, retorna status 204 (No Content)
  res.status(204).end();
};

module.exports = {
  exclude,
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
