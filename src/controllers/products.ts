import { Request, Response } from "express";
import Product from "../models/product";
import { ObjectId } from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.user._id;

  const products = await Product.find({ user: userId });

  res.status(200).json({
    data: [...products],
  });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: ObjectId = req.body.user._id;
  const productData = req.body;

  const data = {
    ...productData,
    user: userId,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json({
    product,
  });
};

export const getOneProduct = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.user._id;
  const { id } = req.params;

  const product = await Product.find({ _id: id, user: userId });

  if (product.length <= 0) {
    res.status(400).json({ msg: "Product not found" });
    return;
  }

  res.status(200).json({ product });
};

export const updateOneProduct = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.user._id;
  const { id } = req.params;
  const toUpdate = req.body;

  const productFound = await Product.findOne({ _id: id });

  if (productFound) {
    await Product.updateOne({ _id: id, user: userId }, toUpdate);
    res.status(200).json({ data: toUpdate });
    return;
  }
  res.status(400).json({ msg: "Product not found" });
};

export const deleteOneProduct = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.user._id;
  const { id } = req.params;

  await Product.deleteOne({ _id: id, user: userId });

  res.status(200).json({ msg: "Product deleted" });
};
