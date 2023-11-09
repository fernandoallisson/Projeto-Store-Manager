const { sales } = require('../models/index');

const getAll = async () => { // TESTADA
  const itens = await sales.getAll();
  return { data: itens };
};

const findById = async (id) => { // TESTADA
  const item = await sales.findById(id);

  if (!item || item.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { item };
};

const create = async (products) => {
  const { id, itemSold } = await sales.create(products);
  return { status: { message: 'CREATED' }, data: { itemSold, id } };
};

const exclude = async (id) => {
  const item = await sales.exclude(id);

  if (!item) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { status: 'SUCCESS', sales: item };
};

const update = async (saleId, productId, quantity) => {
  const updatedSale = await sales.findById(saleId);
  const updatedProduct = updatedSale.find((product) => product.productId === Number(productId));
  await sales.update(saleId, productId, quantity);
  return { status: 200, dados: { saleId: Number(saleId), ...updatedProduct } };
};

module.exports = {
  getAll,
  findById,
  create,
  exclude,
  update,
};
