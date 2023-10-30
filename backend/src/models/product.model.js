const conection = require('./conection.model');

const getAll = async () => {
  const [products] = await conection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await conection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const create = async (name) => {
  const [productCreated] = await conection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: productCreated.id, name };
};

const update = async (id, name) => {
  await conection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  const idProduct = await conection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return idProduct;
};

const exclude = async (id) => {
  await conection.execute('DELETE FROM products WHERE id = ?', [id]);
  return { message: 'Produto excluído com sucesso!' };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};