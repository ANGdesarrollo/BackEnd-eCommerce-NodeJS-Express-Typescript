import supertest from 'supertest';
import { env } from '../../config/envConfig/envConfig';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';

const request = supertest(`http://localhost:${env.PORT}`);
const generateUser = {
  username: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Test all endpoints User', () => {
  describe('REGISTER', () => {
    it('It should return status 201 and be an object', async () => {
      const res = await request.post('/user/register').send(generateUser);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('message', 'status');
    });
  });

  describe('LOGIN', () => {
    it('It should return status 200 and be an object', async () => {
      const res = await request.post('/user/login').send(generateUser);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('message', 'status');
    });
  });
});
