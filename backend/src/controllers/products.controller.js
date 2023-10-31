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

  const products = await produtosService.update(id, name);

  if (products.status === 'NOT_FOUND') {
    return res.status(404).json(products.products);
  }

  res.status(200).json(products.products);
};

// const exclude = async (req, res) => {
//   const { id } = req.params;

//   const products = await produtosService.exclude(id);

//   if (products.status === 'NOT_FOUND') {
//     return res.status(404).json(products.products);
//   }

//   res.status(200).json(products.products);
// };

module.exports = {
  getAll,
  findById,
  create,
  update,
  // exclude,
};
