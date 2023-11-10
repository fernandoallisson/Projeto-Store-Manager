const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const {
  validarCampoProductId,
  validarCampoQuantidade,
  validarTamanhoCampoQuantidade,
  validarVendasPeloId } = require('../../../src/middlewares/validateSales.middlewares');

chai.use(sinonChai);

describe('Testes para Middlewares de Vendas', function () {
  it('Testa se o middleware validarCampoQuantidade chama o next() quando o campo quantity é informado', function () {
    const req = {
      body: {
        quantity: 1,
      },
    };
    const res = {};
    const next = sinon.spy();

    validarCampoQuantidade(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Testa se o middleware validarCampoQuantidade retorna um erro quando o campo quantity não é informado', function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    };
    const next = sinon.spy();

    validarCampoQuantidade(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(400);
    chai.expect(res.status().json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Testa se o middleware validarTamanhoCampoQuantidade chama o next() quando o campo quantity é maior que 0', function () {
    const req = {
      body: {
        quantity: 1,
      },
    };
    const res = {};
    const next = sinon.spy();

    validarTamanhoCampoQuantidade(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Testa se o middleware validarTamanhoCampoQuantidade retorna um erro quando o campo quantity é menor que 1', function () {
    const req = {
      body: {
        quantity: 0,
      },
    };
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    };
    const next = sinon.spy();

    validarTamanhoCampoQuantidade(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(422);
    chai.expect(res.status().json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se o middleware validarCampoProductId chama o next() quando o campo productId é informado', async function () {
    const req = {
      params: {
        productId: 1,
      },
    };
    const res = {};
    const next = sinon.spy();

    await validarCampoProductId(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Testa se o middleware validarCampoProductId retorna um erro quando o campo productId não é informado', async function () {
    const req = {
      params: {},
    };
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    };
    const next = sinon.spy();

    await validarCampoProductId(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.status().json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });

  it('Testa se o middleware validarVendasPeloId chama o next() quando o campo saleId é informado', async function () {
    const req = {
      params: {
        saleId: 1,
      },
    };
    const res = {};
    const next = sinon.spy();

    await validarVendasPeloId(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Testa se o middleware validarVendasPeloId retorna um erro quando o campo saleId não é informado', async function () {
    const req = {
      params: {},
    };
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    };
    const next = sinon.spy();

    await validarVendasPeloId(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.status().json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});