import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../email/mailer";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password }: IUser = req.body;

    const user = new User({ name, email, password });

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const generatedCode = randomstring.generate(5);

    user.code = generatedCode;

    await user.save();

    sendEmail(email, generatedCode);

    res.status(201).json({ msg: "User succesfuly created", data: user });
  } catch (error) {
    res.status(500).json({
      msg: "Server error, when registring a new user: ",
      details: error,
    });
  }
};
