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

const request = supertest(`http://localhost:${env.PORT}`);

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
});
