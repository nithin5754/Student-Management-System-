
import { StatusCodes } from "http-status-codes";
export interface IErrorResponse  {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  errors?: any[];
  serializeErrors(): IError;
}


export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}


export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;
  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }


  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }    
}

export class BadRequestError extends CustomError {
    
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';
  constructor(message:string,comingFrom:string) {
    super(message,comingFrom)
  }
}


export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}