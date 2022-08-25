import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";
import { User } from '../types/User.interface';

const USER = new UserModel();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await USER.getUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;

    const user: User = await USER.getUserById(userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await USER.createUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const deletedUser: User = await USER.deleteUser(id);

    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};
