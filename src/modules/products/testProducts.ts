import supertest from 'supertest';
import { env } from '../../config/envConfig/envConfig';
import { expect } from 'chai';
import { type IProduct } from '../../interfaces/interfaceProduct';
import { faker } from '@faker-js/faker';

const verifyProductProperties = (product: IProduct): void => {
  expect(product).to.have.property('_id').that.is.a('string');
  expect(product).to.have.property('createdAt').that.is.a('string');
  expect(product).to.have.property('updatedAt').that.is.a('string');
  expect(product).to.have.property('name').that.is.a('string');
  expect(product).to.have.property('price').that.is.a('number');
  expect(product).to.have.property('thumbnail').that.is.an('object');
  expect(product.thumbnail).to.have.property('imgPath').that.is.a('string');
  expect(product.thumbnail).to.have.property('backgroundPath').that.is.a('string');
  expect(product).to.have.property('stock').that.is.a('number');
  expect(product).to.have.property('discount').that.is.a('number');
  expect(product).to.have.property('category').that.is.a('string');
  expect(product).to.have.property('soldQty').that.is.a('number');
  expect(product).to.have.property('details').that.is.a('string');
};

interface IProductCreated {
  product: IProduct;
}

const request = supertest(`http://localhost:${env.PORT}`);
const generateProduct = {
  product: {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    thumbnail: {
      imgPath: faker.image.imageUrl(),
      backgroundPath: faker.image.imageUrl(),
    },
    stock: faker.datatype.number(),
    discount: faker.datatype.number(),
    category: faker.commerce.department(),
    details: faker.lorem.paragraph(),
  },
};

describe('Test all endpoints Products', () => {
  describe('Get all products', () => {
    it('It should return status 200 and be an object', async () => {
      const res = await request.get('/products');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('products', 'status');

      const products = res.body.products as IProduct[];
      products.forEach((product) => {
        verifyProductProperties(product);
      });
    });
  });
  let productCreated: IProductCreated;
  describe('SAVE PRODUCT', () => {
    it('It should return status 201 and be an object', async () => {
      const res = await request.post('/products/create').send(generateProduct);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('message', 'status', 'product');

      const product = res.body.product as IProduct;
      verifyProductProperties(product);
      productCreated = { product: res.body.product };
    });
  });

  describe('UPDATE PRODUCT', () => {
    it('It should return status 201 and be an object', async () => {
      const res = await request.put('/products/update').send(productCreated);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('message', 'status', 'product');

      const product = res.body.product;
      verifyProductProperties(product);
    });
  });

  describe('DELETE PRODUCT', () => {
    it('It should return status 200 and be an object', async () => {
      const res = await request.delete(`/products/delete/${productCreated.product._id}`);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('message', 'status', 'product');
    });
  });
});
