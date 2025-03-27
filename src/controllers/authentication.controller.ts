import { NextFunction, Request, Response } from "express";
import credentialsConfig from "../config/credentials.config";
import { StatusCodes } from "http-status-codes";
import { UserModal } from "../models/user.schema";
import { UserRole } from "../types/user.interface";
import { BadRequestError } from "../types/error.interface";
import { emailRegex } from "../utils/constants";

export async function AdminLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (
      email !== credentialsConfig.ADMIN.EMAIL ||
      password !== credentialsConfig.ADMIN.PASSWORD
    ) {
      throw new BadRequestError(
        "Invalid credentials",
        "AdminLogin() method error"
      );
    }

    let admin = await UserModal.findOne({
      email,
      role: UserRole.ADMIN,
    });

    if (!admin) {
      admin = new UserModal({
        name: "Admin",
        email,
        password,
        role: UserRole.ADMIN,
      });

      await admin.save();
    }
    const token: string = await admin.getJWT(admin._id, UserRole.ADMIN);
    res.status(StatusCodes.OK).json({ message: "login", token });
  } catch (error) {
    next(error);
  }
}

export async function StudentLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
 
 
  if(!email||!password){
    throw new BadRequestError("Credentials Missing ", "StudentLogin() method error");
  }
    if(email&&!emailRegex.test(email)){
      throw new BadRequestError("invalid email", "StudentLogin() method error");
    }

    const student = await UserModal.findOne({
      email,
      role: UserRole.STUDENT,
    });

    if (!student) {
      throw new BadRequestError("Not found", "StudentLogin() method error");
    }

    const isPasswordMatch = await student?.comparePassword(password);

    if (!isPasswordMatch) {
      throw new BadRequestError(
        "Invalid  credentials",
        "StudentLogin() method error"
      );
    }
    const token: string = await student.getJWT(student._id, UserRole.STUDENT);
    res.status(StatusCodes.OK).json({ message: "student login", token });
  } catch (error) {
    next(error);
  }
}
