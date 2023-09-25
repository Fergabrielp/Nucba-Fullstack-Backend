import { Model, model, Schema, Types } from "mongoose";

export interface IProduct {
  user: Types.ObjectId;
  title: string;
  thumbnail: string;
  shortDescription: string;
  description: string;
  platform: string;
  genre: string;
  price: number;
  quantity: number;
}

const ProductSchema = new Schema<IProduct>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    default: "No title added",
    required: true,
  },

  thumbnail: {
    type: String,
    default: "No thumbnail added",
    required: true,
  },

  shortDescription: {
    type: String,
    default: "No short description added",
    required: true,
  },

  description: {
    type: String,
    default: "No description added",
    required: true,
  },

  platform: {
    type: String,
    default: "No platform added",
    required: true,
  },

  genre: {
    type: String,
    default: "No genre added",
    required: true,
  },

  price: {
    type: Number,
    default: 0,
    required: true,
  },

  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
