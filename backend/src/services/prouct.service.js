const { product } = require('../models');

const getAll = async () => {
  const itens = await product.getAll();

  return { status: 'SUCCESS', products: itens };
};

const findById = async (id) => {
  const item = await product.findById(id);

  if (!product) {
    return { status: 'NOT_FOUND', products: { message: 'Product not found' } };
  }

  return { status: 'SUCCESS', products: item[0] };
};

const create = async (name) => {
  const item = await product.create(name);

  return { status: 'SUCCESS', products: item };
};

const update = async (id, name) => {
  const item = await product.update(id, name);

  if (!item) return { status: 'NOT_FOUND', message: 'Product not found' };

  return { status: 'SUCCESS', products: item[0] };
};

const exclude = async (id) => {
  const item = await product.exclude(id);

  if (!item) return { status: 'NOT_FOUND', message: 'Product not found' };

  return { status: 'SUCCESS', products: item[0] };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};