const conection = require('./conection.model');

const getAll = async () => { // TESTADA
  const [sales] = await conection.execute(
    `SELECT 
        sales_products.sale_id AS saleId,
        sales_products.product_id AS productId,
        sales_products.quantity AS quantity,
        sales.date AS date
    FROM sales_products 
    JOIN sales ON sales_products.sale_id = sales.id;`,
  );
  return sales;
};

const findById = async (id) => { // TESTADA
  const [sale] = await conection.execute(`SELECT sales_products.product_id AS productId, 
  sales_products.quantity, sales.date
  FROM sales_products 
  JOIN sales ON sales_products.sale_id = sales.id
  WHERE sales.id = ?`, [id]);
  return sale;
};

const create = async (products) => { // TESTADA
  const [sale] = await conection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  const { insertId: id } = sale;

  const promessa = products.map((product) => conection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, product.productId, product.quantity],
  ));
  await Promise.all(promessa);
  return { id: sale.insertId, itemSold: products };
};

const exclude = async (id) => {
  const [result] = await conection.execute('DELETE FROM sales WHERE id = ?', [id]);
  
  if (result.affectedRows === 0) {
    return null; // Retorna null se nenhum sale foi excluído (não encontrado)
  }
  
  return { message: 'Venda excluída com sucesso!' };
};

const update = async (saleId, productId, quantity) => {
  await conection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  
  return { message: 'Venda atualizada com sucesso!' };
};

module.exports = {
  getAll,
  findById,
  create,
  exclude,
  update,
};