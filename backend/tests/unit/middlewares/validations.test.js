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

describe('Testes para middlewares de validação de produtos', function () { // CONCLUÍDO COM OS TESTES UNITÁRIOS
  it('Deve chamar next() se o nome do produto for válido', function () { // TESTADA
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
  it('Deve retornar um status 422 quando o nome é muito curto', function () { // TESTADA
    const req = {
      body: {
        name: 'Curt',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    validarNomeProduto(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(422);
    chai.expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  }); 
  it('Deve retornar um status 400 quando o nome está em branco', function () { // TESTADA
    const req = {
      body: {
        name: '',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    validarNomeProduto(req, res, next);

    chai.expect(res.status).to.have.been.calledWith(400);
    chai.expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Deve chamar next() se o productId for fornecido', async function () { // TESTADA
    const req = { 
      body: [
        { 
          productId: 2,
          quantity: 2,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarVendaPeloId(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Não Deve chamar next() se o productId não for fornecido', async function () { // TESTADA
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
  it('Não Deve chamar next() se o quantity não for fornecido', async function () { // TESTADA
    const req = { 
      body: [
        { productId: 2 },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarQuantidadeVendas(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
    chai.expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Deve chamar next() se o quantity tiver um valor válido', async function () { // TESTADA
    const req = { 
      body: [
        { productId: 1,
          quantity: 3,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarTamanhoVendas(req, res, next);

    chai.expect(next).to.have.been.calledWith();
  });
  it('Não Deve chamar next() se o quantity tiver um valor inválido', async function () {
    const req = { 
      body: [
        { productId: 4,
          quantity: -4,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await validarTamanhoVendas(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
    chai.expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  it('Não Deve chamar next() se o produto não existir', async function () {
    const req = { 
      body: [
        { productId: -1,
          quantity: 1999,
        },
      ], 
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub().returns();

    await existeProduto(req, res, next);

    chai.expect(next).not.to.have.been.calledWith();
  });
  // it('Deve chamar next() se o produto existir', async function () {
  //   const req = { 
  //     body: [
  //       { productId: 1,
  //         quantity: 1,
  //       },
  //     ], 
  //   };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  //   const next = sinon.stub().returns();

  //   await existeProduto(req, res, next);

  //   chai.expect(next).to.have.been.calledWith();
  // });
});
