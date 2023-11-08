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
});