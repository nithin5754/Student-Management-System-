import { NextFunction, Request, Response } from "express";
import { UserModal } from "../models/user.schema";
import { BadRequestError } from "../types/error.interface";
import { UserRole } from "../types/user.interface";

export async function AddStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password, department } = req.body;

    const existingStudent = await UserModal.findOne({ email });
    if (existingStudent) {
      throw new BadRequestError(
        "'Student already exists'",
        "AddStudent () method Error"
      );
    }

    const student = new UserModal({
      name,
      email,
      password,
      role: UserRole.STUDENT,
      department,
    });

    await student.save();

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    next(error);
  }
}
export async function hello(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
   

    res.status(200).json({
      message: "Student added successfully",
      user:req.user,
    });
  } catch (error) {
    next(error);
  }
}