import {IExtendedError} from "../types";
import {NextFunction, Request, Response} from "express";

export const errorHandler = (err: IExtendedError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
}

export const status400Handler = (req: Request, res: Response, next: NextFunction) => {
  const error: IExtendedError = new Error('Bad request');
  error.status = 400;
  next(error);
}

export const status401Handler = (req: Request, res: Response, next: NextFunction) => {
  const error: IExtendedError = new Error('Unauthorized');
  error.status = 401;
  next(error);
}

export const status403Handler = (req: Request, res: Response, next: NextFunction) => {
  const error: IExtendedError = new Error('Forbidden');
  error.status = 403;
  next(error);
}
export const status404Handler = (req: Request, res: Response, next: NextFunction) => {
  const error: IExtendedError = new Error('Resource not found');
  error.status = 404;
  next(error);
}

export const status409Handler = (req: Request, res: Response, next: NextFunction) => {
  const error: IExtendedError = new Error('Conflict');
  error.status = 409;
  next(error);
}
