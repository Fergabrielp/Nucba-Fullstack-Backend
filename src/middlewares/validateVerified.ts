import { NextFunction, Request, Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  const { verified } = req.body.user;
  if (!verified) {
    res.status(401).json({
      msg: "User not verified",
    });
    return;
  }

  next();
};
