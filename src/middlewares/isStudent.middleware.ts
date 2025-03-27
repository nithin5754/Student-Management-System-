import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/user.interface";

const isStudentMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (user && user.userId && user.role === UserRole.STUDENT) {
    next();
  } else {
    res.status(403).json({ message: "student access required" });
  }
};
export default isStudentMiddleWare;
