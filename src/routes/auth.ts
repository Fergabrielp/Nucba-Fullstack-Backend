import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { showErrors } from "../middlewares/showErrors";
import { check } from "express-validator";
import { emailExist } from "../validations/dbValidations";

const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
    check("email").custom(emailExist),

    showErrors,
  ],

  register
);

router.patch(
  "/verify",
  [
    check("email", "Email is required").isEmail(),
    check("code", "Code is required").not().isEmpty(),
    showErrors,
  ],
  verifyUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
    showErrors,
  ],
  login
);
///
export default router;
