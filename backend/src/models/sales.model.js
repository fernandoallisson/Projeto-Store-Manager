const conection = require('./conection.model');

const getAll = async () => {
  const [sales] = await conection.execute(
    `SELECT
      sales_products.sale_id,
      sales_products.product_id,
      sales_products.quantity,
      sales.total_price,
      sales.sale_date
    FROM sales_products
    INNER JOIN sales ON sales_products.sale_id = sales.id`,
  );
  return sales;
};

const findById = async (id) => {
  const [sale] = await conection.execute(
    `SELECT
      sales_products.sale_id,
      sales_products.quantity,
      sales.date,
    FROM sales_products
    INNER JOIN sales ON sales_products.sale_id = sales.id
    WHERE sale_id = ?`,
    [id],
  );
  return sale;
};

const create = async (products) => {
  const [sale] = await conection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  const { insertId: id } = sale;

  const promises = products.map((product) => conection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [product.insertId, id, product.quantity],
  ));

  await Promise.all(promises);

  return { id: sale.insertId, obj: products };
};

const exclude = async (id) => {
  await conection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return { message: 'Venda excluída com sucesso!' };
};

module.exports = {
  getAll,
  findById,
  create,
  exclude,
};