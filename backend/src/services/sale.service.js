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
  const { id, obj } = await sales.create(products);
  console.log(id, obj);
  return { data: { id, itensSold: obj } };
};

// const update = async (id, products) => {
//   const sale = await sales.update(id, products);

//   if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

//   return { status: 'SUCCESS', data: sale };
// };

// const exclude = async (id) => {
//   const sale = await sales.exclude(id);

//   if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

//   return { status: 'SUCCESS', data: sale };
// };

module.exports = {
  getAll,
  findById,
  create,
  // update,
  // exclude,
};
