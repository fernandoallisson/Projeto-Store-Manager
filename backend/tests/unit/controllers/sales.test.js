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
  // it('Deve criar uma nova venda', async function () {
  //   const req = { body: {} };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   const salesData = { data: req.body };
  //   sinon.stub(vendasService, 'create').resolves(salesData);

  //   await vendasService.create(req, res);

  //   chai.expect(res.status).to.have.been.calledWith(201);
  //   chai.expect(res.json).to.have.been.calledWith(salesData.data);
  // });
});