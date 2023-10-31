const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/index');
const productsService = require('../../../src/services/index');

chai.use(sinonChai);

describe('Testa o controller de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa /products', async function () {
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
  it('Testa /products/:id', async function () {
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
});