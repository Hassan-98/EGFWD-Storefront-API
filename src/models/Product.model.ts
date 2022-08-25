import database from '../configs/db.config';

import { Product as IProduct, ReturnedProduct } from '../types/Product.interface';

export default class Product {
  // Get all products
  async getProducts(): Promise<ReturnedProduct[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${err}`);
    }
  }

  // Get product by id
  async getProductById(productId: number): Promise<ReturnedProduct> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await connection.query(sql, [productId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${err}`);
    }
  }

  // Get product by category
  async getProductsByCategory(category: string): Promise<ReturnedProduct[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products WHERE category=$1`;
      const result = await connection.query(sql, [category]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product by category. Error: ${err}`);
    }
  }

  // Create new product
  async createProduct(product: IProduct): Promise<ReturnedProduct> {
    try {
      const { name, price, category } = product;
      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const connection = await database.connect();
      const result = await connection.query(sql, [name, price, category]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }

  // Delete product
  async deleteProduct(id: number): Promise<ReturnedProduct> {
    try {
      const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const connection = await database.connect();
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
