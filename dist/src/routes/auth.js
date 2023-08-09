"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const showErrors_1 = require("../middlewares/showErrors");
// import { validateRegister } from "../middlewares/validateUser";
const router = (0, express_1.Router)();
router.post("/register", [showErrors_1.showErrors], auth_1.register);
exports.default = router;
