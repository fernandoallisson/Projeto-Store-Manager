const vendasService = require('../services/index');

const getAll = async (_req, res) => {
  const { sales } = await vendasService.getAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sales = await vendasService.findById(id);

  if (sales.status === 'NOT_FOUND') {
    return res.status(404).json(sales.sales);
  }

  res.status(200).json(sales);
};

const create = async (req, res) => {
  const { body } = req;

  const sales = await vendasService.create(body);

  res.status(201).json(sales.sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const sales = await vendasService.update(id, body);

  res.status(200).json(sales);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const sales = await vendasService.delete(id);

  res.status(200).json(sales);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
// Adicionar o update e o delete ainda