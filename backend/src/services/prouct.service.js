const { product } = require('../models/index');

const getAll = async () => {
  const products = await product.getAll();

  return { status: 'SUCCESS', products };
};

const findById = async (id) => {
  const products = await product.findById(id);

  if (!products) return { status: 'NOT_FOUND', message: 'Product not found' };

  return { status: 'SUCCESS', products };
};

const create = async (name) => {
  const products = await product.create(name);

  return { status: 'SUCCESS', products };
};

const update = async (id, name) => {
  const products = await product.update(id, name);

  if (!products) return { status: 'NOT_FOUND', message: 'Product not found' };

  return { status: 'SUCCESS', products };
};

const exclude = async (id) => {
  const products = await product.exclude(id);

  if (!products) return { status: 'NOT_FOUND', message: 'Product not found' };

  return { status: 'SUCCESS', products };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};