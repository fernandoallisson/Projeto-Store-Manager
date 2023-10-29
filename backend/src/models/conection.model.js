const MYSQL = require('mysql2/promise');

const connection = MYSQL.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  charset: 'utf8mb4',
});

module.exports = connection;