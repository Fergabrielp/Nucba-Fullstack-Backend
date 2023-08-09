// import { NextFunction, Request, Response } from "express";
// import { check } from "express-validator";

// export const validateRegister = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   if (req) {
//     check("name", "Name is required HDP!").not().isEmpty(),
//       check("email", "Email is required HDP!").isEmail(),
//       check("password", "Password is required HDP!").isLength({ min: 6 });
//   } else {
//     next();
//   }
// };
