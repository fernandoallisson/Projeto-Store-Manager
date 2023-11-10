const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/conection.model');

const { sales } = require('../../../src/models/index');

const mockProduct = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
  },
];

chai.use(sinonChai);

describe('Testa o model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa /sales', async function () {
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    const result = await sales.getAll();
    const expected = mockProduct;
    chai.expect(result).to.been.equal(expected);
  });
  it('Testa /sales/:id', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    const result = await sales.findById(id);
    const expected = mockProduct[0];
    chai.expect(result[0]).to.been.equal(expected);
  });
  it('Testa a função create', async function () {
    const products = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    const insertId = 1;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    sinon.stub(sales, 'create').resolves(products);
    const result = await sales.create(products);
    const expected = { id: insertId, itemSold: products };
    chai.expect(result).to.been.equal(expected.itemSold);
  });
  it('Testa a função exclude quando affectedRos === 0', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    sinon.stub(sales, 'exclude').resolves(null);
    const result = await sales.exclude(id);
    chai.expect(result).to.been.equal(null);
  });
  it('Testa a função create 1', async function () {
    // Dados de exemplo para o teste
    const products = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];

    // Configura o stub para a chamada à conection.execute
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    // Chama a função create com os produtos de exemplo
    const result = await sales.create(products);

    // Define o resultado esperado
    const expected = { id: 1, itemSold: products };

    // Verifica se o resultado é igual ao esperado
    chai.expect(result).to.deep.equal(expected);
  });
  it('Testa a função update', async function () {
    // Dados de exemplo para o teste
    const saleId = 1;
    const productId = 2;
    const quantity = 5;
  
    // Configura o stub para a chamada à conection.execute
    const executeStub = sinon.stub(connection, 'execute');
  
    // Chama a função update com os parâmetros de exemplo
    await sales.update(saleId, productId, quantity);
  
    // Verifica se a função conection.execute foi chamada corretamente
    chai.expect(executeStub).to.have.been.calledWith(
      'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, saleId, productId],
    );
  
    // Restaura o stub
    executeStub.restore();
  });
});
