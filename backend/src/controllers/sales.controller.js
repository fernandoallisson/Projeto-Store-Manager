const salesService = require('../services');

const getAll = async (_req, res) => {
  const sales = await salesService.vendasService;

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);

  res.status(status).json(data);
};

const create = async (req, res) => {
  const itensSold = req.body;

  const { status, data } = await salesService.create(itensSold);

  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const { status, data } = await salesService.update(id, itensSold);

  res.status(status).json(data);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesService.exclude(id);

  res.status(status).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
