import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-token"] as string;

  if (!token) {
    res.status(401).json({
      msg: "No token found",
    });
    return;
  }

  try {
    const secret = process.env.SECRET as string;
    const payload = jwt.verify(token, secret) as JwtPayload;

    const { id } = payload;

    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({
        msg: "Invalid token",
      });
      return;
    }

    req.body.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};
