const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { vendasService } = require('../../../src/services/index');
const { sales } = require('../../../src/models/index');

const mockSale = [
  {
    productId: 2,
    quantity: 3,
    date: '2021-09-06T03:00:00.000Z',
  },
  {
    productId: 3,
    quantity: 1,
    date: '2021-09-06T03:00:00.000Z',
  },
  {
    productId: 4,
    quantity: 5,
    date: '2021-09-06T03:00:00.000Z',
  },
];

chai.use(sinonChai);

describe('Testa o service de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa /sales/:id com sucesso', async function () {
    sinon.stub(sales, 'findById').resolves(mockSale[0]);
  
    const response = await vendasService.findById(1);
  
    chai.expect(response).to.be.deep.equal({ item: mockSale[0] });
  });
  it('Testa função exclude', async function () {
    sinon.stub(sales, 'exclude').resolves(mockSale[0]);

    const response = await vendasService.exclude(1);

    chai.expect(response).to.be.deep.equal({ status: 'SUCCESS', sales: mockSale[0] });
  });
  it('getAll should return products', async function () {
    // Crie um stub para a função getAll do model
    const getAllStub = sinon.stub(sales, 'getAll').resolves([{ id: 1, name: 'Product 1' }]);

    // Chame a função getAll do serviço
    const result = await vendasService.getAll();

    // Verifique se o stub foi chamado corretamente
    chai.expect(getAllStub).to.have.been.calledWith();

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ data: [{ id: 1, name: 'Product 1' }] });
  });
  it('create should return CREATED status and data when sales are created successfully', async function () {
    // Crie um stub para a função create do model
    const createStub = sinon.stub(sales, 'create').resolves({ id: 1, itemSold: mockSale });

    // Chame a função create do serviço
    const result = await vendasService.create(mockSale);

    // Verifique se o stub foi chamado corretamente
    chai.expect(createStub).to.have.been.calledWith(mockSale);

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({
      status: { message: 'CREATED' },
      data: { itemSold: mockSale, id: 1 },
    });
  });
  it('update should return the updated sale information', async function () {
    const saleId = 1;
    const productId = 1;
    const quantity = 5;

    // Mock de um sale encontrado pelo ID
    const mockUpdatedSale = [
      {
        productId: 1,
        quantity: 5,
        date: '2021-09-06T03:00:00.000Z',
      },
      // ... outros produtos
    ];

    // Crie stubs para as funções findById e update do model
    const findByIdStub = sinon.stub(sales, 'findById').resolves(mockUpdatedSale);
    const updateStub = sinon.stub(sales, 'update').resolves();

    // Chame a função update do serviço
    const result = await vendasService.update(saleId, productId, quantity);

    // Verifique se os stubs foram chamados corretamente
    chai.expect(findByIdStub).to.have.been.calledWith(saleId);
    chai.expect(updateStub).to.have.been.calledWith(saleId, productId, quantity);

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({
      status: 200,
      dados: {
        saleId: Number(saleId),
        ...mockUpdatedSale.find((product) => product.productId === Number(productId)),
        quantity,
      },
    });
  });
  it('exclude should return NOT_FOUND status when sale not found', async function () {
    const saleId = 1;

    // Configuração do stub para a função exclude do model
    const excludeStub = sinon.stub(sales, 'exclude').resolves(null);

    // Chame a função exclude do serviço
    const result = await vendasService.exclude(saleId);

    // Verifique se o stub foi chamado corretamente
    chai.expect(excludeStub).to.have.been.calledWith(saleId);

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({
      status: 'NOT_FOUND',
      message: 'Sale not found',
    });
  });
});