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

module.exports = {
  getAll,
  findById,
  create,
};
// Adicionar o update e o delete ainda