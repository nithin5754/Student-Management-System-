import { NextFunction, Request, Response } from "express";
import { TaskModal } from "../models/task.schema";
import { BadRequestError } from "../types/error.interface";



export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {

    const {studentId,taskId}=req.params

    const task = await TaskModal.updateOne({_id:taskId,studentId},{status:'completed'})
    if (!task) {
      throw new BadRequestError(
        "'something went wrong'",
        "updateTask () method Error"
      );
    }

    res.status(201).json({
      message: "task completed",
      status:'completed',
    });
  } catch (error) {
    next(error);
  }
}



export async function GetAllTasks(req: Request, res: Response, next: NextFunction) {
  try {

    const {studentId}=req.params

    const tasks = await TaskModal.find({studentId})
    if (!tasks) {
      throw new BadRequestError(
        "something went wrong",
        "GetAllTasks () method Error"
      );
    }

    res.status(201).json({
      message: "task completed",
      tasks
    });
  } catch (error) {
    next(error);
  }
}