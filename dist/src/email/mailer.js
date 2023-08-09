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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASS_MAILER,
    },
    from: process.env.USER_MAILER,
});
const sendEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailOptions = {
            from: `"FerGames" ${process.env.USER_MAILER}`,
            to,
            subject: "Verification Code - FerGames",
            html: `<p>Welcome to <b>FerGames</b>, this is your verification code: </p>
             <h3><b>${code}</b></h3>
             <p>Please, go to the app and type this code to verify your account.</p>`,
        };
        yield transporter.sendMail(emailOptions);
        console.log("Email with verification code sent");
    }
    catch (error) {
        console.log("Error trying to send the verification code email: ", error);
    }
});
exports.sendEmail = sendEmail;
