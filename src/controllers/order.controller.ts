import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/Order.model";
import { Order, ReturnedOrder } from '../types/Order.interface';

const ORDER = new OrderModel();

export const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.user_id;

    if (!userId) throw new Error('Invalid User Id');

    const orders: Order[] = await ORDER.getOrders(userId);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.user_id;

    if (!userId) throw new Error('Invalid User Id');

    const order: ReturnedOrder = await ORDER.getCurrentOrderByUserId(userId);

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getActiveOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.user_id;

    if (!userId) throw new Error('Invalid User Id');

    const orders: ReturnedOrder[] = await ORDER.getActiveOrdersByUserId(userId);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getCompletedOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.user_id;

    if (!userId) throw new Error('Invalid User Id');

    const orders: ReturnedOrder[] = await ORDER.getCompletedOrdersByUserId(userId);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string;
    const orderId = +(req.query.orderId as string);

    if (!orderId || ['active', 'complete'].indexOf(status) === -1) throw new Error('Invalid Status or Order Id');

    const order: Order = await ORDER.updateOrderStatus(status, orderId);

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = await ORDER.createOrder(req.body);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const deletedOrder: Order = await ORDER.deleteOrder(id);

    res.status(200).json(deletedOrder);
  } catch (err) {
    next(err);
  }
};
