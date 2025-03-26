import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import { UserDocuments, UserRole } from "../types/user.interface";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { 
      type: String, 
      required: true,
     
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword=async function (password:string) {

  const isValid:boolean=await bcrypt.compare(password,this.password);

  return isValid

  
}


// userSchema.method.getJWT=async function () {
//   const accessToken: string = jwt.sign({,email,username}, this.jwt_key, {
//     expiresIn: "1d",
//   });

//   return accessToken;
  
// }


export const UserModal:Model<UserDocuments> = mongoose.model<UserDocuments>("User", userSchema)