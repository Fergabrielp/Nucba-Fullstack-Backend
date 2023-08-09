import { Model, model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  code?: string;
  verified?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  code: {
    type: String,
    default: "Code not added yet",
  },

  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...user } = this.toObject();
  return user;
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
