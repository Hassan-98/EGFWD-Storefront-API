import database from "../../configs/db.config";
import OrderModel from "../../models/Order.model";

import UserModel from "../../models/User.model";
import ProductModel from "../../models/Product.model";
import { ReturnedOrder } from '../../types/Order.interface';

const ORDER = new OrderModel();
const USER = new UserModel();
const PRODUCT = new ProductModel();

describe('Test Order Model', () => {
  beforeAll(async () => {
    await USER.createUser({
      firstname: 'hassan',
      lastname: 'ali',
      password: 'hassan123'
    });

    await PRODUCT.createProduct({
      name: 'Huawei nova 7',
      price: '450',
      category: 'smartphone'
    });
  });

  it('getCurrentOrderByUserId method should be exists', () => {
    expect(ORDER.getCurrentOrderByUserId).toBeDefined();
  });

  it('getCompletedOrdersByUserId method should be exists', () => {
    expect(ORDER.getCompletedOrdersByUserId).toBeDefined();
  });

  it('getActiveOrdersByUserId method should be exists', () => {
    expect(ORDER.getActiveOrdersByUserId).toBeDefined();
  });

  it('getOrders method should be exists', () => {
    expect(ORDER.getOrders).toBeDefined();
  });

  it('updateOrderStatus method should be exists', () => {
    expect(ORDER.updateOrderStatus).toBeDefined();
  });

  it('deleteOrder method should be exists', () => {
    expect(ORDER.deleteOrder).toBeDefined();
  });

  it('createOrder method should be exists', () => {
    expect(ORDER.createOrder).toBeDefined();
  });

  it('test create order using createOrder method', async () => {
    const order: ReturnedOrder = await ORDER.createOrder({
      product_id: 1,
      quantity: 5,
      user_id: 1,
      status: 'active'
    });

    expect(order.id).toBe(1);
    expect(order.product_id).toBe(1);
    expect(order.quantity).toBe(5);
    expect(order.user_id).toBe(1);
    expect(order.status).toBe('active')
  });
  
  it('test get orders of a user using getOrders method', async () => {
    const user_id = 1;
    const orders: ReturnedOrder[] = await ORDER.getOrders(user_id);

    expect(orders[0].id).toBe(1);
    expect(orders[0].product_id).toBe(1);
    expect(orders[0].quantity).toBe(5);
    expect(orders[0].user_id).toBe(user_id);
    expect(orders[0].status).toBe('active');
  });

  it('test get current order of a user using getCurrentOrderByUserId method', async () => {
    const user_id = 1;
    const order: ReturnedOrder = await ORDER.getCurrentOrderByUserId(user_id);

    expect(order.id).toBe(1);
    expect(order.product_id).toBe(1);
    expect(order.quantity).toBe(5);
    expect(order.user_id).toBe(user_id);
    expect(order.status).toBe('active');
  });

  it('test get active orders of a user using getActiveOrdersByUserId method', async () => {
    const user_id = 1;
    const orders: ReturnedOrder[] = await ORDER.getActiveOrdersByUserId(user_id);

    expect(orders).toHaveSize(1);
    expect(orders[0].id).toBe(1);
    expect(orders[0].product_id).toBe(1);
    expect(orders[0].quantity).toBe(5);
    expect(orders[0].user_id).toBe(user_id);
    expect(orders[0].status).toBe('active');
  });

  it('test get completed orders of a user using getCompletedOrdersByUserId method', async () => {
    const user_id = 1;
    const orders: ReturnedOrder[] = await ORDER.getCompletedOrdersByUserId(user_id);

    expect(orders).toHaveSize(0);
  });

  it('test update order status using updateOrderStatus method', async () => {
    const id = 1;
    const order: ReturnedOrder = await ORDER.updateOrderStatus('complete', id);

    expect(order.id).toBe(id);
    expect(order.product_id).toBe(1);
    expect(order.quantity).toBe(5);
    expect(order.user_id).toBe(1);
    expect(order.status).toBe('complete');
  });

  it('test delete order using deleteOrder method', async () => {
    const id = 1;
    const order: ReturnedOrder = await ORDER.deleteOrder(id);

    expect(order.id).toBe(id);
    expect(order.product_id).toBe(1);
    expect(order.quantity).toBe(5);
    expect(order.user_id).toBe(1);
    expect(order.status).toBe('complete');
  });
  
  afterAll(async () => {
    await USER.deleteUser(1);
    await PRODUCT.deleteProduct(1);

    const connection = await database.connect();
    const sql = `ALTER SEQUENCE orders_id_seq RESTART WITH 1;ALTER SEQUENCE users_id_seq RESTART WITH 1;ALTER SEQUENCE products_id_seq RESTART WITH 1;`

    await connection.query(sql);

    connection.release();
  });
});
