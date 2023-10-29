const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

module.exports = {
  getAll,
};