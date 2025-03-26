import { NextFunction, Request, Response } from "express";
import credentialsConfig from "../config/credentials.config";
import { StatusCodes } from "http-status-codes";
import { UserModal } from "../models/user.schema";
import { UserRole } from "../types/user.interface";
import { BadRequestError, NotFoundError } from "../types/error.interface";

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
    res.status(StatusCodes.OK).json({ message: "login" });
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

    let student = await UserModal.findOne({
      email,
      role: UserRole.STUDENT,
    });

    if (!student) {
      throw new NotFoundError("Not found", "StudentLogin() method error");
    }

    const isPasswordMatch = await student?.comparePassword(password);

    if (!isPasswordMatch) {
      throw new BadRequestError(
        "Invalid  credentials",
        "StudentLogin() method error"
      );
    }

    res.status(StatusCodes.OK).json({ message: "student login" });
  } catch (error) {
    next(error);
  }
}
