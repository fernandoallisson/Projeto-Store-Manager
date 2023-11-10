const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { produtosService } = require('../../../src/services/index');
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

describe('Testa o service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa /products/:id retorna produto não encontrado', async function () {
    const nonExistentProductId = -1;
    sinon.stub(product, 'findById').resolves([]);
    
    const response = await produtosService.findById(nonExistentProductId);
  
    chai.expect(response).to.be.deep.equal({ status: 'NOT_FOUND', products: { message: 'Product not found' } });
  });
  it('Testa POST /products', async function () {
    const newProduct = {
      id: 123,
      name: 'Novo Produto',
    };
    sinon.stub(product, 'create').resolves(newProduct);
  
    const response = await produtosService.create();
  
    chai.expect(response).to.be.deep.equal({ item: newProduct });
  });
  it('Testa /products/:id com sucesso', async function () {
    sinon.stub(product, 'findById').resolves(mockProduct[0]);
  
    const response = await produtosService.findById(1);
  
    chai.expect(response).to.be.deep.equal({ item: mockProduct[0] });
  });
  it('Testa função exclude', async function () {
    sinon.stub(product, 'exclude').resolves(mockProduct[0]);
  
    const response = await produtosService.exclude(1);
  
    chai.expect(response).to.be.deep.equal({ status: 'SUCCESS', products: mockProduct[0] });
  });
  it('getAll should return products', async function () {
    // Crie um stub para a função getAll do model
    const getAllStub = sinon.stub(product, 'getAll').resolves([{ id: 1, name: 'Product 1' }]);

    // Chame a função getAll do serviço
    const result = await produtosService.getAll();

    // Verifique se o stub foi chamado corretamente
    chai.expect(getAllStub).to.have.been.calledWith();

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ products: [{ id: 1, name: 'Product 1' }] });
  });
  it('update should return success when product is found', async function () {
    // Crie um stub para a função update do model
    const updateString = 'Updated Product';
    const updateStub = sinon.stub(product, 'update').resolves([{ id: 1, name: updateString }]);

    // Chame a função update do serviço
    const result = await produtosService.update(1, updateString);

    // Verifique se o stub foi chamado corretamente
    chai.expect(updateStub).to.have.been.calledWith(1, updateString);

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ status: 'SUCCESS', product: { id: 1, name: 'Updated Product' } });
  });
  it('update should return NOT_FOUND when product is not found', async function () {
    // Crie um stub para a função update do model que retorna uma lista vazia
    const updateStub = sinon.stub(product, 'update').resolves([]);

    // Chame a função update do serviço
    const result = await produtosService.update(1, 'Updated Product');

    // Verifique se o stub foi chamado corretamente
    chai.expect(updateStub).to.have.been.calledWith(1, 'Updated Product');

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ status: 'NOT_FOUND', message: 'Product not found' });
  });
  it('searchProductsByName should return products when items are found', async function () {
    // Crie um stub para a função searchProductsByName do model
    const searchStub = sinon.stub(product, 'searchProductsByName').resolves([{ id: 1, name: 'Product 1' }]);

    // Chame a função searchProductsByName do serviço
    const result = await produtosService.searchProductsByName('Product');

    // Verifique se o stub foi chamado corretamente
    chai.expect(searchStub).to.have.been.calledWith('Product');

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ itens: [{ id: 1, name: 'Product 1' }] });
  });
  it('searchProductsByName should return an empty array when no items are found', async function () {
    // Crie um stub para a função searchProductsByName do model que retorna uma lista vazia
    const searchStub = sinon.stub(product, 'searchProductsByName').resolves([]);

    // Chame a função searchProductsByName do serviço
    const result = await produtosService.searchProductsByName('Non-existent Product');

    // Verifique se o stub foi chamado corretamente
    chai.expect(searchStub).to.have.been.calledWith('Non-existent Product');

    // Verifique se o resultado é o esperado
    chai.expect(result).to.deep.equal({ itens: [] });
  });
});