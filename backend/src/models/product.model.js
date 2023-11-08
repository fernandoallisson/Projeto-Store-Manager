const conection = require('./conection.model');

const getAll = async () => { // TESTADA
  const [products] = await conection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => { // TESTADA
  const [[product]] = await conection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const create = async (name) => { // TESTADA
  const [productCreated] = await conection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: productCreated.insertId, name };
};

const update = async (id, name) => {
  await conection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  const [idProduct] = await conection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return idProduct;
};

const exclude = async (id) => {
  const [result] = await conection.execute('DELETE FROM products WHERE id = ?', [id]);
  
  if (result.affectedRows === 0) {
    return null; // Retorna null se nenhum produto foi excluído (não encontrado)
  }
  
  return { message: 'Produto excluído com sucesso!' };
};

module.exports = {
  exclude,
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};