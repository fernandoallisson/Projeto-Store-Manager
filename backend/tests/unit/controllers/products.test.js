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
  it('Testa /products/:id para atualizar um produto', async function () { // Testa o controller de produtos
    const req = { params: { id: 1 }, body: { name: 'teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const status = 200;
    sinon.stub(productsService.produtosService, 'update').resolves({ product: {
      id: req.params.id,
      name: req.body.name,
    } });

    await productsController.controleDeProdutos.update(req, res);

    chai.expect(res.status).to.have.been.calledWith(status);
    chai.expect(res.json).to.have.been.calledWith({
      id: req.params.id,
      name: req.body.name,
    });
  });
  it('Testa /products/:id para atualizar um produto que não exista', async function () { // Testa o controller de produtos
    const req = { params: { id: 1 }, body: { name: 'teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const status = 404;
    sinon.stub(productsService.produtosService, 'update').resolves({ status: 'NOT_FOUND', message: 'Product not found' });

    await productsController.controleDeProdutos.update(req, res);
    
    chai.expect(res.status).to.have.been.calledWith(status);
    chai.expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Testa uma busca feita por nome', async function () { // Testa o controller de produtos
    const req = { query: { q: 'teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'searchProductsByName').resolves({ itens: [] });

    await productsController.controleDeProdutos.searchProductsByName(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith([]);
  });
  it('Testa uma busca feita por nome com o q sem nada', async function () { // Testa o controller de produtos
    const req = { query: { q: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService.produtosService, 'getAll').resolves({ products: [] });

    await productsController.controleDeProdutos.searchProductsByName(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith([]);
  });
});