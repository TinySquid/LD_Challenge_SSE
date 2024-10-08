import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  const response = {
    error: true,
    message: statusCode === 500 ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
}

export default errorHandler;
