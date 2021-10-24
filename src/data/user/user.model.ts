import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: Date;
}

export interface UserModel extends mongoose.Model<IUser> {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export const userSchema = new mongoose.Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.statics.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
const User = mongoose.model<IUser, UserModel>("User", userSchema);
export { User };
// export type User = typeof userSchema
