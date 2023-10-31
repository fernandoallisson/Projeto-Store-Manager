const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/conection.model');

const { product } = require('../../../src/models/index');

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
  it('Testa /products', async function () {
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    const result = await product.getAll();
    const expected = mockProduct;
    chai.expect(result).to.been.equal(expected);
  });
  it('Testa /products/:id', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    const result = await product.findById(id);
    const expected = mockProduct[0];
    chai.expect(result).to.been.equal(expected);
  });
});