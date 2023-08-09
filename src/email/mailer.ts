import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
  from: process.env.USER_MAILER,
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  try {
    const emailOptions = {
      from: `"FerGames" ${process.env.USER_MAILER}`,
      to,
      subject: "Verification Code - FerGames",
      html: `<p>Welcome to <b>FerGames</b>, this is your verification code: </p>
             <h3><b>${code}</b></h3>
             <p>Please, go to the app and type this code to verify your account.</p>`,
    };

    await transporter.sendMail(emailOptions);
    console.log("Email with verification code sent");
  } catch (error) {
    console.log("Error trying to send the verification code email: ", error);
  }
};
