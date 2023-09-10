import { sendEmail } from "../email/mailer";
import User, { IUser } from "../models/user";

export const emailExist = async (email: string): Promise<void> => {
  const isExistingEmail: IUser | null = await User.findOne({ email });

  if (isExistingEmail && isExistingEmail.verified) {
    throw new Error(`Email ${isExistingEmail} is already registered`);
  }

  if (isExistingEmail && !isExistingEmail.verified) {
    await sendEmail(email, isExistingEmail.code as string);
    throw new Error(
      `Email ${isExistingEmail} is already registeredm, but it is not verified. Sending verification code again.`
    );
  }
};
