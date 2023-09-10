"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const showErrors_1 = require("../middlewares/showErrors");
const express_validator_1 = require("express-validator");
const dbValidations_1 = require("../validations/dbValidations");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must have at least 6 characters").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("email").custom(dbValidations_1.emailExist),
    showErrors_1.showErrors,
], auth_1.register);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("code", "Code is required").not().isEmpty(),
    showErrors_1.showErrors,
], auth_1.verifyUser);
router.post("/login", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must have at least 6 characters").isLength({
        min: 6,
    }),
    showErrors_1.showErrors,
], auth_1.login);
exports.default = router;
