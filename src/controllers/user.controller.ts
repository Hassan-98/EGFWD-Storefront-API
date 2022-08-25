import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";
import { ReturnedUser, UserWithToken } from '../types/User.interface';

const USER = new UserModel();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: ReturnedUser[] = await USER.getUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;

    const user: ReturnedUser = await USER.getUserById(userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserWithToken = await USER.createUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const deletedUser: ReturnedUser = await USER.deleteUser(id);

    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};
