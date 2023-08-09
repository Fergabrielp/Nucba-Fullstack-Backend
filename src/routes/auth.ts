import { Router } from "express";
import { register } from "../controllers/auth";
import { showErrors } from "../middlewares/showErrors";
// import { validateRegister } from "../middlewares/validateUser";

const router = Router();

router.post("/register", [showErrors], register);

export default router;
