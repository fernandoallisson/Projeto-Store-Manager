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
  it('Deve retornar uma lista de produtos ao chamar getAll', async function () {
    // Configuração do ambiente de teste
    const expectedProducts = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
    const connectionStub = sinon.stub(connection, 'execute').resolves([expectedProducts]);

    // Chame a função getAll
    const result = await product.getAll();

    // Valide as expectativas
    chai.expect(result).to.deep.equal(expectedProducts);
    chai.expect(connectionStub).to.have.been.calledWith('SELECT * FROM products');

    // Restaure o stub
    connectionStub.restore();
  });
  it('Deve retornar um produto ao chamar findById', async function () {
    // Configuração do ambiente de teste
    const expectedProduct = { id: 1, name: 'Produto 1' };
    const connectionStub = sinon.stub(connection, 'execute').resolves([[expectedProduct]]);

    // Chame a função findById
    const result = await product.findById(1);

    // Valide as expectativas
    chai.expect(result).to.deep.equal(expectedProduct);
    sinon.assert.calledWith(connectionStub, 'SELECT * FROM products WHERE id = ?', [1]);
    // Restaure o stub
    connectionStub.restore();
  });
  it('Deve retornar um produto ao chamar create', async function () {
    // Configuração do ambiente de teste
    const mock = { id: 1, name: 'Produto 1' };
    const connectionStub = sinon.stub(connection, 'execute').resolves([{ insertId: 1, name: 'Produto 1' }]);

    // Chame a função create
    const result = await product.create('Produto 1');

    // Valide as expectativas
    chai.expect(result).to.deep.equal(mock);
    chai.expect(connectionStub).to.have.been.calledWith('INSERT INTO products (name) VALUES (?)', ['Produto 1']);

    // Restaure o stub
    connectionStub.restore();
  });
  it('Testa a função exclude', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await product.exclude(id);
    const expected = { message: 'Produto excluído com sucesso!' };
    chai.expect(result.message).to.been.equal(expected.message);
  });
  it('Testa a função exclude com affetedRows === 0', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    const result = await product.exclude(id);
    const expected = null;
    chai.expect(result).to.been.equal(expected);
  });
});