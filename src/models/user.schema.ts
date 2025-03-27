import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import { UserDocuments, UserRole } from "../types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import credentialsConfig from "../config/credentials.config";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password: string) {
  const isValid: boolean = await bcrypt.compare(password, this.password);

  return isValid;
};

userSchema.methods.getJWT =  function (
  id: string,
  role: UserRole
): string {
  const accessToken: string =  jwt.sign(
    { userId: id, role },
    credentialsConfig.JWT.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
};

userSchema.pre("save",async function (next) {
  this.password=await bcrypt.hash(this.password,10)

  next()
})



export const UserModal: Model<UserDocuments> = mongoose.model<UserDocuments>(
  "User",
  userSchema
);
