const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);

module.exports = {
  getAll,
};