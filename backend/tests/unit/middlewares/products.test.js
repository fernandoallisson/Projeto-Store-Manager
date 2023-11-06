const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  existeProduto,
  validarNomeProduto,
  validarQuantidadeVendas,
  validarTamanhoVendas,
  validarVendaPeloId,
} = require('../../../src/middlewares/validate.middlewares');

chai.use(sinonChai);

describe('Testes para middlewares de validação de produtos', function () { // Modificar ainda
  it('Deve chamar next() se o nome do produto for válido', function () {
    const req = {
      body: {
        name: 'Produto Válido',
      },
    };
    const res = {};
    const next = sinon.stub().returns();

    validarNomeProduto(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });

  it('Deve chamar next() se o nome do produto for curto', function () {
    const req = {
      body: {
        name: 'Curto',
      },
    };
    const res = {};
    const next = sinon.stub().returns();

    validarNomeProduto(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });

  it('Deve chamar next() se o productId for fornecido', async function () {
    const req = { 
      body: [
        { quantity: 2 },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarVendaPeloId(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
  });

  it('Deve chamar next() se o quantity for fornecido', async function () {
    const req = { 
      body: [
        { productId: 2 },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarQuantidadeVendas(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
  });

  it('Deve chamar next() se o quantity tiver um valor válido', async function () {
    const req = { 
      body: [
        { productId: 2,
          quantity: 2,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarTamanhoVendas(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });

  it('Deve chamar next() se o produto existir', async function () {
    const req = { 
      body: [
        { productId: 99,
          quantity: 2,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await existeProduto(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
  });  
});
