import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../types/error.interface";

import jwt from "jsonwebtoken";
import credentialsConfig from "../config/credentials.config";
import { UserRole } from "../types/user.interface";
import { UserModal } from "../models/user.schema";

interface TokenPayload {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export async function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new NotAuthorizedError(
        "Authorization token missing",
        "authenticateMiddleware() method error"
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new NotAuthorizedError(
        "Invalid token format",
        "authenticateMiddleware() method error"
      );
    }

    const decoded = jwt.verify(
      token,
      credentialsConfig.JWT.JWT_SECRET
    ) as TokenPayload;

    if (!decoded) {
      throw new NotAuthorizedError(
        "Unauthorized",
        "authenticateMiddleware() method error"
      );
    }

    const user = await UserModal.findById(decoded.userId);

    if (!user) {
      throw new NotAuthorizedError(
        "User not found",
        "authenticateMiddleware() method error"
      );
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}
export async function studentOnly(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || req.user.role !== UserRole.STUDENT) {
      throw new NotAuthorizedError(
        "Student access required",
        "studentOnly() method error"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function adminOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || req.user.role !== UserRole.STUDENT) {
      throw new NotAuthorizedError(
        "admin access required",
        "adminOnly() method error"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
