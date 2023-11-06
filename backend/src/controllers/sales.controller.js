const { vendasService } = require('../services/index');

const getAll = async (_req, res) => { // TESTADA, Mas falta teste unit.
  const { data } = await vendasService.getAll();
  console.log(data);
  res.status(200).json(data);
};

const findById = async (req, res) => { // TESTADA
  const { id } = req.params;

  const sales = await vendasService.findById(id);
  if (sales.status === 'NOT_FOUND') {
    return res.status(404).json(sales.data);
  }

  res.status(200).json(sales.item);
};

const create = async (req, res) => {
  const { body } = req;
  const sales = await vendasService.create(body);

  res.status(201).json(sales.data);
};

// const update = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   const sales = await vendasService.vendasService.update(id, body);

//   res.status(200).json(sales);
// };

// const remove = async (req, res) => {
//   const { id } = req.params;

//   const sales = await vendasService.vendasService.delete(id);

//   res.status(200).json(sales);
// };

module.exports = {
  getAll,
  findById,
  create,
  // update,
  // remove,
};
// Adicionar o update e o delete ainda