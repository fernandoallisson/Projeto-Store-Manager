const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/index');
const productsService = require('../../../src/services/index');

chai.use(sinonChai);

describe('Testa o controller de produtos', function () { // Concluído
  afterEach(function () {
    sinon.restore();
  });
  it('Testa /products', async function () { // Testa o controller de produtos
    sinon.stub(productsService.produtosService, 'getAll').resolves({ products: [] });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.controleDeProdutos.getAll(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith([]);
  });
  it('Testa /products/:id', async function () { // Testa o controller de produtos
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'findById').resolves({ item: {} });

    await productsController.controleDeProdutos.findById(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith({});
  });
  it('Testa os produtos', async function () { // Testa o controller de produtos
    const req = { body: { name: 'teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'create').resolves({ item: {
      id: 1,
      name: 'teste',
    } });

    await productsController.controleDeProdutos.create(req, res);

    chai.expect(res.status).to.have.been.calledWith(201);
    chai.expect(res.json).to.have.been.calledWith({
      id: 1,
      name: 'teste',
    });
  });
  it('Testa os produtos 1', async function () { // Testa o controller de produtos
    const req = { body: { name: 'teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'create').resolves({ item: {} });

    await productsController.controleDeProdutos.create(req, res);

    chai.expect(res.status).to.have.been.calledWith(201);
    chai.expect(res.json).to.have.been.calledWith({});
  });
  it('Testa /products/:id com productId inexistente', async function () { // Testa o controller de produtos
    const req = { params: { id: 9999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'findById').resolves({ status: 'NOT_FOUND', products: { message: 'Product not found' } });

    await productsController.controleDeProdutos.findById(req, res);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});