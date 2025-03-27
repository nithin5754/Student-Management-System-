import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/user.interface";

const isAdminMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (user && user.userId && user.role === UserRole.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
export default isAdminMiddleWare;
