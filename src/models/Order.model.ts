import database from '../configs/db.config';

import { Order as IOrder, ReturnedOrder } from '../types/Order.interface';

export default class Order {
  // Get all orders for a user
  async getOrders(userId: number): Promise<ReturnedOrder[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`);
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<ReturnedOrder> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 ORDER BY user_id DESC LIMIT 1`;
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`);
    }
  }

  // Get active order by user id
  async getActiveOrdersByUserId(userId: number): Promise<ReturnedOrder[]> {
    try {
      const status = 'active';
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
      const result = await connection.query(sql, [userId, status]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get active order. Error: ${err}`);
    }
  }

  // Get completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<ReturnedOrder[]> {
    try {
      const status = 'complete';
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
      const result = await connection.query(sql, [userId, status]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  // Create new order
  async createOrder(order: IOrder): Promise<ReturnedOrder> {
    try {
      const { product_id, quantity, user_id, status } = order;

      const connection = await database.connect();
      const sql = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [product_id, quantity, user_id, status]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  // Update an order
  async updateOrderStatus(status: string, orderId: number): Promise<ReturnedOrder> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await connection.query(sql, [status, orderId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  // Delete an order
  async deleteOrder(id: number): Promise<ReturnedOrder> {
    try {
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;
      const connection = await database.connect();
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
