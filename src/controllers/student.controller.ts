import { NextFunction, Request, Response } from "express";
import { UserModal } from "../models/user.schema";
import { BadRequestError } from "../types/error.interface";
import { UserRole } from "../types/user.interface";

export async function GetStudentDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;

    const student = await UserModal.findOne({ _id: user?.userId }, [
      "-password",
    ]);
    if (!student) {
      throw new BadRequestError(
        "'Not found'",
        "GetStudentDetails () method Error"
      );
    }

    res.status(201).json({
      message: "student details",
      student,
    });
  } catch (error) {
    next(error);
  }
}

export async function GetAllStudents(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const students = await UserModal.find({ role: UserRole.STUDENT }, [
      "-password",
    ]);
    if (!students) {
      throw new BadRequestError(
        "'Not found'",
        "GetStudentDetails () method Error"
      );
    }

    res.status(201).json({
      message: "student details",
      students,
    });
  } catch (error) {
    next(error);
  }
}
