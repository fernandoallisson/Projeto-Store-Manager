const { product } = require('../models');

const getAll = async () => {
  const itens = await product.getAll();

  return { products: itens };
};

const findById = async (id) => {
  const item = await product.findById(id);

  if (!item || item.length === 0) {
    return { status: 'NOT_FOUND', products: { message: 'Product not found' } };
  }

  return { item };
};

const create = async (name) => { // TESTADA
  const item = await product.create(name);

  return { item };
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