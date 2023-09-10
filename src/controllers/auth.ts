import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../email/mailer";
import generateJWT from "../helpers/generateJWT";

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

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: "Email not found",
      });
      return;
    }

    if (user.verified) {
      res.status(400).json({
        msg: "User is already verified, please login",
      });
      return;
    }

    if (user.code !== code) {
      res.status(400).json({
        msg: "Incorrect code, please try again",
      });
      return;
    }

    await User.findOneAndUpdate({ email }, { verified: true });

    res.status(201).json({
      msg: "User succesfuly verified",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error, when verifying a new user: ",
      details: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: `User with email ${email} not found`,
      });
      return;
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      res.status(400).json({
        msg: "Incorrect password",
      });
      return;
    }

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({
      msg: "Server error, when login user: ",
      details: error,
    });
  }
};
