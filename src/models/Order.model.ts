import database from '../configs/db.config';

import { Order as IOrder, CreateOrder } from '../types/Order.interface';

export default class Order {
  // Get all orders for a user
  async getOrders(userId: number): Promise<IOrder[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const result = await connection.query(sql, [userId]);

      const ordersResult: IOrder[] = result.rows;

      let orders: IOrder[] = [];

      for (const order of ordersResult) {
        const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products  JOIN products ON product_id=id WHERE order_id=$1`;
        const populateProductResult = await connection.query(populateProductSQL, [order.id]);
        orders.push({ ...order, products: populateProductResult.rows })
      }

      connection.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`);
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<IOrder> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 ORDER BY user_id DESC LIMIT 1`;
      const result = await connection.query(sql, [userId]);

      const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products JOIN products ON product_id=id WHERE order_id=$1`;
      const populateProductResult = await connection.query(populateProductSQL, [result.rows[0].id]);

      connection.release();

      let order: IOrder = { ...result.rows[0], products: populateProductResult.rows }

      return order;
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`);
    }
  }

  // Get active order by user id
  async getActiveOrdersByUserId(userId: number): Promise<IOrder[]> {
    try {
      const status = 'active';
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
      const result = await connection.query(sql, [userId, status]);
      
      const ordersResult: IOrder[] = result.rows;

      let orders: IOrder[] = [];

      for (const order of ordersResult) {
        const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products  JOIN products ON product_id=id WHERE order_id=$1`;
        const populateProductResult = await connection.query(populateProductSQL, [order.id]);
        orders.push({ ...order, products: populateProductResult.rows })
      }

      connection.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not get active order. Error: ${err}`);
    }
  }

  // Get completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<IOrder[]> {
    try {
      const status = 'complete';
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2`;
      const result = await connection.query(sql, [userId, status]);
      
      const ordersResult: IOrder[] = result.rows;

      let orders: IOrder[] = [];

      for (const order of ordersResult) {
        const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products JOIN products ON product_id=id WHERE order_id=$1`;
        const populateProductResult = await connection.query(populateProductSQL, [order.id]);
        orders.push({ ...order, products: populateProductResult.rows })
      }

      connection.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  // Create new order
  async createOrder(order: CreateOrder): Promise<IOrder> {
    try {
      const { products, user_id, status } = order;

      const connection = await database.connect();
      const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`;
      const result = await connection.query(sql, [user_id, status]);

      const createdOrder: IOrder = result.rows[0];

      for (const product of products) {
        const addProductsToOrderSQL = `INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)`
        await connection.query(addProductsToOrderSQL, [createdOrder.id, product.id, product.quantity]);
      }
      
      const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products  JOIN products ON product_id=id WHERE order_id=$1`;
      const populateProductResult = await connection.query(populateProductSQL, [createdOrder.id]);

      let populatedOrder: IOrder = { ...createdOrder, products: populateProductResult.rows }

      connection.release();

      return populatedOrder;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  // Update an order
  async updateOrderStatus(status: string, orderId: number): Promise<IOrder> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await connection.query(sql, [status, orderId]);
      
      const populateProductSQL = `SELECT product_id, quantity, name AS product_name, price AS product_price, category AS product_category FROM order_products  JOIN products ON product_id=id WHERE order_id=$1`;
      const populateProductResult = await connection.query(populateProductSQL, [result.rows[0].id]);

      let populatedOrder: IOrder = { ...result.rows[0], products: populateProductResult.rows }

      connection.release();

      return populatedOrder;
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  // Delete an order
  async deleteOrder(id: number): Promise<IOrder> {
    try {
      const connection = await database.connect();

      const orderProductsSQL = "DELETE FROM order_products WHERE order_id=($1)"
      await connection.query(orderProductsSQL, [id])

      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
