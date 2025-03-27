import { NextFunction, Request, Response } from "express";
import { TaskModal } from "../models/task.schema";
import { BadRequestError } from "../types/error.interface";
import { ITaskDocuments, TaskStatus } from "../types/task.interface";
import { StatusCodes } from "http-status-codes";

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const user = req.user;
    const { status } = req.body;

    if (!status || !Object.values(TaskStatus).includes(status)) {
      throw new BadRequestError("Invalid status", "updateTask () method Error");
    }

    let currentDate = new Date();

    const isTask = await TaskModal.findOne({
      _id: taskId,
      studentId: user?.userId,
    });
    if (
      isTask &&
      new Date(isTask.dueDate) < currentDate &&
      isTask.status === TaskStatus.PENDING
    ) {
      await TaskModal.findByIdAndUpdate(taskId, {
        status: TaskStatus.OVERDUE,
      });

      throw new BadRequestError(
        "Task is overdue and cannot be updated",
        "updateTask () method Error"
      );
    }
    if (isTask && isTask.status === TaskStatus.OVERDUE) {
      throw new BadRequestError(
        "Task is overdue and cannot be updated",
        "updateTask () method Error"
      );
    }

    const task = await TaskModal.updateOne(
      { _id: taskId, studentId: user?.userId },
      { status }
    );
    if (!task) {
      throw new BadRequestError(
        "something went wrong",
        "updateTask () method Error"
      );
    }

    res.status(StatusCodes.OK).json({
      message: "task completed",
      status: "completed",
    });
  } catch (error) {
    next(error);
  }
}

export async function GetAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;

    const tasks = await TaskModal.find({ studentId: user?.userId });
    if (!tasks) {
      throw new BadRequestError(
        "something went wrong",
        "GetAllTasks () method Error"
      );
    }

    const currentDate = new Date();

    const updateTasks = tasks
      .filter(
        (task: ITaskDocuments) =>
          new Date(task.dueDate) < currentDate &&
          task.status === TaskStatus.PENDING
      )
      .map((task: ITaskDocuments) => ({
        updateOne: {
          filter: { _id: task?._id },
          update: { $set: { status: TaskStatus.OVERDUE } },
        },
      }));

    if (updateTask.length > 0) {
      await TaskModal.bulkWrite(updateTasks);
    }

    res.status(StatusCodes.OK).json({
      message: "tasks",
      tasks,
    });
  } catch (error) {
    next(error);
  }
}
