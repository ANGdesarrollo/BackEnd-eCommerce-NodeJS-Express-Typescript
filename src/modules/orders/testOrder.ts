import supertest from 'supertest';
import { env } from '../../config/envConfig/envConfig';
import { expect } from 'chai';
import { type IOrder } from '../../interfaces/interfaceOrders';

const verifyOrderProperties = (order: IOrder): void => {
  expect(order).to.have.property('_id').that.is.a('string');
  expect(order).to.have.property('created_at').that.is.a('string');
  expect(order).to.have.property('username').that.is.a('string');
  expect(order).to.have.property('cart').that.is.an('array');

  const cartItems = order.cart;
  cartItems.forEach((item) => {
    expect(item).to.have.property('_id').that.is.a('string');
    expect(item).to.have.property('qty').that.is.a('number');
  });

  expect(order).to.have.property('amount').that.is.a('number');
};

// interface IOrderCreated {
//   product: IOrder;
// }

const request = supertest(`http://localhost:${env.PORT}`);
// const generateOrder = {
//   product: {
//     name: faker.commerce.productName(),
//     price: parseFloat(faker.commerce.price()),
//     thumbnail: {
//       imgPath: faker.image.imageUrl(),
//       backgroundPath: faker.image.imageUrl(),
//     },
//     stock: faker.datatype.number(),
//     discount: faker.datatype.number(),
//     category: faker.commerce.department(),
//     details: faker.lorem.paragraph(),
//   },
// };

describe('Test all endpoints Orders', () => {
  describe('Get all orders', () => {
    it('It should return status 200 and be an object', async () => {
      const res = await request.get('/order');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('allOrders', 'status');

      const orders = res.body.allOrders as IOrder[];
      orders.forEach((order) => {
        verifyOrderProperties(order);
      });
    });
  });
  // let productCreated: IProductCreated;
  // describe('SAVE PRODUCT', () => {
  //   it('It should return status 201 and be an object', async () => {
  //     const res = await request.post('/products/create').send(generateProduct);
  //     expect(res.status).to.eql(201);
  //     expect(res.body).to.be.a('object');
  //     expect(res.body).to.include.keys('message', 'status', 'product');
  //
  //     const product = res.body.product as IProduct;
  //     verifyProductProperties(product);
  //     productCreated = { product: res.body.product };
  //   });
  // });
  //
  // describe('UPDATE PRODUCT', () => {
  //   it('It should return status 201 and be an object', async () => {
  //     const res = await request.put('/products/update').send(productCreated);
  //     expect(res.status).to.eql(201);
  //     expect(res.body).to.be.a('object');
  //     expect(res.body).to.include.keys('message', 'status', 'product');
  //
  //     const product = res.body.product;
  //     verifyProductProperties(product);
  //   });
  // });
  //
  // describe('DELETE PRODUCT', () => {
  //   it('It should return status 200 and be an object', async () => {
  //     const res = await request.delete(`/products/delete/${productCreated.product._id}`);
  //     expect(res.status).to.eql(200);
  //     expect(res.body).to.be.a('object');
  //     expect(res.body).to.include.keys('message', 'status', 'product');
  //   });
  // });
});
