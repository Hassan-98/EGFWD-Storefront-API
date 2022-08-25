import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/Product.model";
import { Product } from '../types/Product.interface';

const PRODUCT = new ProductModel();

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products: Product[] = await PRODUCT.getProducts();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = +req.params.id;

    const product: Product = await PRODUCT.getProductById(productId);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productCategory:string = req.params.category;

    const products: Product[] = await PRODUCT.getProductsByCategory(productCategory);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = await PRODUCT.createProduct(req.body);

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const deletedProduct: Product = await PRODUCT.deleteProduct(id);

    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};
