"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showErrors = void 0;
const express_validator_1 = require("express-validator");
const showErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorDetails: errors });
    }
    else {
        next();
    }
};
exports.showErrors = showErrors;
