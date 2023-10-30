const { sales } = require('../models/index');

const getAll = async () => {
  const sale = await sales.getAll();

  return { status: 'SUCCESS', sale };
};

const findById = async (id) => {
  const sale = await sales.findById(id);

  if (!sale) return { status: 'NOT_FOUND', message: 'Sale not found' };

  return { status: 'SUCCESS', sale };
};

const create = async (products) => {
  const { id, obj } = await sales.create(products);

  return { status: 'SUCCESS', sale: { obj, id } };
};

module.exports = {
  getAll,
  findById,
  create,
};
