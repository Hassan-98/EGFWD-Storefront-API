import { app } from '../../index';
import generateToken from '../../utils/generateToken';
import database from "../../configs/db.config";
import supertest from 'supertest';

const request = supertest(app);

describe('Test Products Routes' , () => {
  const TestingToken = generateToken(1);

  it('test create product route "POST: /api/products"', async () => {
    const response = await request.post('/api/products').send({
      name: 'Iphone pro max',
      price: '1250',
      category: 'smartphones'
    })
    .set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Iphone pro max');
    expect(response.body.price).toBe('1250');
    expect(response.body.category).toBe('smartphones');
  });

  it('test get all products route "GET: /api/products"', async () => {
    const response = await request.get('/api/products').set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveSize(1);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].name).toBe('Iphone pro max');
  });

  it('test get a product route "GET: /api/products/:id"', async () => {
    const response = await request.get('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Iphone pro max');
    expect(response.body.price).toBe('1250');
    expect(response.body.category).toBe('smartphones');
  });

  it('test get products by category route "GET: /api/products/category/:category"', async () => {
    const response = await request.get('/api/products/category/smartphones');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveSize(1);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].category).toBe('smartphones');
  });

  it('test delete a user route "DELETE: /api/products/:id"', async () => {
    const response = await request.delete('/api/products/1').set('Authorization', `Bearer ${TestingToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Iphone pro max');
    expect(response.body.price).toBe('1250');
    expect(response.body.category).toBe('smartphones');
  });

  afterAll(async () => {
    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'

    await connection.query(sql);

    connection.release();
  });
});