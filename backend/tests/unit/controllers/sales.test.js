const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { controleDeVendas } = require('../../../src/controllers/index');
const { vendasService } = require('../../../src/services/index');

chai.use(sinonChai);

describe('Testa o controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa /sales/:id', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(vendasService, 'findById').resolves({ item: {} });

    await controleDeVendas.findById(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith({});
  });
  it('testa /sales', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(vendasService, 'getAll').resolves({ data: {} });

    await controleDeVendas.getAll(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith({});
  });
  it('testa /sales no modo post', async function () {
    const mock = {
      id: 1,
      itensSold: [
        {
          productId: 1,
          quantity: 10,
        },
      ],
    };
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(vendasService, 'create').resolves({ data: mock, status: 'CREATED' });

    await controleDeVendas.create(req, res);

    chai.expect(res.status).to.have.been.calledWith(201);
    chai.expect(res.json).to.have.been.calledWith({ id: mock.id, itemsSold: mock.itemSold });
  });
  it('testa /sales no modo get buscando por um id inexistente', async function () {
    const req = { params: { id: 9999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(vendasService, 'findById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    await controleDeVendas.findById(req, res);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});