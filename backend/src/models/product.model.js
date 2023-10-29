const conection = require('./conection.model');

const getAll = async () => {
  const [products] = await conection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await conection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const create = async (name, quantity) => {
  await conection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
};

const update = async (id, name, quantity) => {
  await conection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
};

const exclude = async (id) => {
  await conection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};