"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.verifyUser = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../email/mailer");
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = new user_1.default({ name, email, password });
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        const generatedCode = randomstring_1.default.generate(5);
        user.code = generatedCode;
        yield user.save();
        (0, mailer_1.sendEmail)(email, generatedCode);
        res.status(201).json({ msg: "User succesfuly created", data: user });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error, when registring a new user: ",
            details: error,
        });
    }
});
exports.register = register;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
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
        yield user_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(201).json({
            msg: "User succesfuly verified",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error, when verifying a new user: ",
            details: error,
        });
    }
});
exports.verifyUser = verifyUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: `User with email ${email} not found`,
            });
            return;
        }
        const validatePassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validatePassword) {
            res.status(400).json({
                msg: "Incorrect password",
            });
            return;
        }
        const token = yield (0, generateJWT_1.default)(user.id);
        res.json({ user, token });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error, when login user: ",
            details: error,
        });
    }
});
exports.login = login;
