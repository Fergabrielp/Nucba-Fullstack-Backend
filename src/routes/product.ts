import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import { isVerified } from "../middlewares/validateVerified";
import {
  getAllProducts,
  getProducts,
  createProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} from "../controllers/products";

const router = Router();

router.get("/all", validateToken, getAllProducts);
router.get("/", [validateToken, isVerified], getProducts);
router.post("/", [validateToken, isVerified], createProduct);
router.get("/:id", [validateToken, isVerified], getOneProduct);
router.put("/:id", [validateToken, isVerified], updateOneProduct);
router.delete("/:id", [validateToken, isVerified], deleteOneProduct);

export default router;
