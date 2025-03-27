import { Request } from "express";
import { BadRequestError } from "../types/error.interface";
import { emailRegex } from "./constants";

export const AddStudentValidation = (req: Request) => {
  const { name, email, password, department } = req.body;
  if (!name) {
    throw new BadRequestError(
      "Name is not valid",
      "AddStudentValidation () method Error"
    );
  } else if (!emailRegex.test(email)) {
    throw new BadRequestError(
      "Email is not valid!",
      "AddStudentValidation () method Error"
    );
  } else if (
    !password ||
    password === "" ||
    password.length <= 6 ||
    typeof password !== "string"
  ) {
    throw new BadRequestError(
      "Please enter a strong Password! atleast 7 characters",
      "AddStudentValidation () method Error"
    );
  } else if (!department || typeof department !== "string") {
    throw new BadRequestError(
      "department is not valid!",
      "AddStudentValidation () method Error"
    );
  }
};

export const AddTaskValidation = (req: Request) => {
  const { title, description, dueDate } = req.body;
  if (!title) {
    throw new BadRequestError(
      "title is not valid",
      "AddStudentValidation () method Error"
    );
  } else if (!description) {
    throw new BadRequestError(
      "description is not valid!",
      "AddStudentValidation () method Error"
    );
  } else if (!dueDate) {
    throw new BadRequestError(
      "dueDate is not valid",
      "AddStudentValidation () method Error"
    );
  }
};
