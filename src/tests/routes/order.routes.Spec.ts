import supertest from 'supertest';
import { app } from '../../index';
import generateToken from '../../utils/generateToken';
import database from "../../configs/db.config";

import UserModel from "../../models/User.model";
import ProductModel from "../../models/Product.model";

const request = supertest(app);
const USER = new UserModel();
const PRODUCT = new ProductModel();

describe('Test Orders Routes' , () => {
  const TestingToken = generateToken(1);

  beforeAll(async () => {
    await USER.createUser({
      firstname: 'hassan',
      lastname: 'ali',
      password: '123456'
    });

    await PRODUCT.createProduct({
      name: 'Huawei nova 7',
      price: '500',
      category: 'smartphone'
    });
  })

  it('test create order route "POST: /api/orders"', async () => {
    const response = await request.post('/api/orders').send({
      products: [{ id: 1, quantity: 3 }],
      user_id: 1,
      status: 'active'
    })
    .set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.products).toBeDefined();
    expect(response.body.products).toHaveSize(1);
    expect(response.body.products[0].product_id).toBe(1);
    expect(response.body.products[0].quantity).toBe(3);
    expect(response.body.user_id).toBe(1);
    expect(response.body.status).toBe('active');
  });

  it('test get all orders by user id route "GET: /api/orders/:user_id"', async () => {
    const user_id = 1;
    const response = await request.get(`/api/orders/${user_id}`).set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveSize(1);
    expect(response.body[0].user_id).toBe(user_id);
  });

  it('test get current user order route "GET: /api/orders/current/:user_id"', async () => {
    const user_id = 1;
    const response = await request.get(`/api/orders/current/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.user_id).toBe(user_id);
  });

  it('test get active orders route "GET: /api/orders/active/:user_id"', async () => {
    const user_id = 1;
    const response = await request.get(`/api/orders/active/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveSize(1);
    expect(response.body[0].user_id).toBe(user_id);
    expect(response.body[0].status).toBe('active');
  });

  it('test update order status route "PATCH: /api/orders?status=<status>&orderId=<order id>"', async () => {
    const status = 'complete';
    const order_id = 1;
    const response = await request.patch(`/api/orders?status=${status}&orderId=${order_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(order_id);
    expect(response.body.status).toBe('complete');
  });

  it('test get completed orders route "GET: /api/orders/completed/:user_id"', async () => {
    const user_id = 1;
    const response = await request.get(`/api/orders/completed/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveSize(1);
    expect(response.body[0].user_id).toBe(user_id);
    expect(response.body[0].status).toBe('complete');
  });

  it('test delete a user route "DELETE: /api/orders/:id"', async () => {
    const order_id = 1;
    const response = await request.delete(`/api/orders/${order_id}`).set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(order_id);
    expect(response.body.user_id).toBe(1);
    expect(response.body.status).toBe('complete');
  });

  afterAll(async () => {
    const connection = await database.connect();
    const sql = 'DELETE FROM users; DELETE FROM products; ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE orders_id_seq RESTART WITH 1;'

    await connection.query(sql);

    connection.release();
  });
});