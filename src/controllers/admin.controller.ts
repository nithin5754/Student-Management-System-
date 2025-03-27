import { NextFunction, Request, Response } from "express";
import { UserModal } from "../models/user.schema";
import { BadRequestError } from "../types/error.interface";
import { UserRole } from "../types/user.interface";
import { TaskModal } from "../models/task.schema";
import { AddStudentValidation } from "../utils/validation";

export async function AddStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    AddStudentValidation(req)

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
      message: "new student added successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function AddTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, dueDate } = req.body;

    const user = req.user;

    const student = await UserModal.findById(user?.userId);
    if (!student) {
      throw new BadRequestError(
        "'Something went wrong'",
        "AddStudent () method Error"
      );
    }

    const newTask = new TaskModal({
      studentId: user?.userId,
      title,
      description,
      dueDate: new Date(dueDate),
      status: "pending",
    });

    await newTask.save();

    res.status(201).json({
      message: "Task assigned successfully",
      taskId: newTask._id,
    });
  } catch (error) {
    next(error);
  }
}
