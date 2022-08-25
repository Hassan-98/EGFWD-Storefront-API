import bcrypt from 'bcrypt';
import database from '../configs/db.config';
import generateToken from '../utils/generateToken';

import { User as IUser, ReturnedUser, UserWithToken } from '../types/User.interface';

const { BCRYPT_SECRET, BCRYPT_SALT } = process.env;

export default class User {
  // get all users
  async getUsers(): Promise<ReturnedUser[]> {
    try {
      const connection = await database.connect();
      const sql: string = `SELECT * FROM users`;
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${err}`);
    }
  }

  // get user by id
  async getUserById(userId: number): Promise<ReturnedUser> {
    try {
      const connection = await database.connect();
      const sql: string = `SELECT * FROM users WHERE id = $1`;
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id. Error: ${err}`);
    }
  }

  // create a new user
  async createUser(user: IUser): Promise<UserWithToken> {
    try {
      const { firstname, lastname, password } = user;

      const hashedPassword: string = bcrypt.hashSync(password + BCRYPT_SECRET, parseInt(BCRYPT_SALT as string));

      const connection = await database.connect();
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [firstname, lastname, hashedPassword]);
      connection.release();

      const token: string = generateToken(result.rows[0].id as number);

      const createdUser = { ...result.rows[0], token };

      return createdUser;
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  // delete a user
  async deleteUser(id: number): Promise<ReturnedUser> {
    try {
      const sql: string = `DELETE FROM users WHERE id=$1 RETURNING *`;
      const connection = await database.connect();
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user with id: ${id}. Error: ${err}`);
    }
  }
}
