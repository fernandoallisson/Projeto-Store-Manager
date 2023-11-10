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
});
