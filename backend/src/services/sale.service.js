const { sales } = require('../models/index');

const getAll = async () => {
  const sale = await sales.getAll();

  return { status: 'SUCCESS', data: sale };
};

const findById = async (id) => {
  const sale = await sales.findById(id);

  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESS', data: sale };
};

const create = async (products) => {
  const { id, obj } = await sales.create(products);

  return { status: 'SUCCESS', data: { id, obj } };
};

const update = async (id, products) => {
  const sale = await sales.update(id, products);

  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESS', data: sale };
};

const exclude = async (id) => {
  const sale = await sales.exclude(id);

  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESS', data: sale };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
