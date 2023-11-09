const { vendasService } = require('../services/index');

const getAll = async (_req, res) => { // TESTADA, Mas falta teste unit.
  const { data } = await vendasService.getAll();
  console.log(data);
  res.status(200).json(data);
};

const findById = async (req, res) => { // TESTADA
  const { id } = req.params;

  const sales = await vendasService.findById(id);
  if (sales.status === 'NOT_FOUND') {
    return res.status(404).json(sales.data);
  }

  res.status(200).json(sales.item);
};

const create = async (req, res) => {
  const { data, status } = await vendasService.create(req.body);
  if (status === 'NOT_FOUND') {
    return res.status(404).json(data.itemSold);
  }

  res.status(201).json({ id: data.id, itemsSold: data.itemSold });
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const sales = await vendasService.exclude(id);
  if (sales.status === 'NOT_FOUND') {
    return res.status(404).json({ message: sales.message });
  }

  res.status(204).end();
};

// const update = async (req, res) => {
//   const { saleId, productId } = req.params;
//   const { quantity } = req.body;
//   const { data, status } = await vendasService.update(saleId, productId, quantity);

//   res.status(status).json(data);
// };

module.exports = {
  getAll,
  findById,
  create,
  exclude,
  // update,
};