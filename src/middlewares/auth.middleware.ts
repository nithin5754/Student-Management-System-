import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import credentialsConfig from "../config/credentials.config";
import { UserRole } from "../types/user.interface";
import { UserModal } from "../models/user.schema";
import { NotAuthorizedError } from "../types/error.interface";

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
        "Invalid request",
        "jWT AUTH() method: Request not coming from api gateway"
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again.",
        "jWT AUTH() method invalid session error"
      );
    }

    const decoded = jwt.verify(
      token,
      credentialsConfig.JWT.JWT_SECRET
    ) as TokenPayload;

    if (!decoded) {
      throw new NotAuthorizedError(
        "authorized",
        "jWT AUTH() method: Request not coming from api gateway"
      );
    }

    const user = await UserModal.findById(decoded.userId);

    if (!user) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again.",
        "jWT AUTH() method invalid session error"
      );
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "unauthorized  credentials, please login" });
  }
}
