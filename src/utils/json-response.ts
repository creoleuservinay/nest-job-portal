import { Request, Response } from 'express';

class JSONResponse {
  static success(
    req: Request,
    res: Response,
    statusCode: number,
    message: string,
  ) {
    return res.status(statusCode).json({
      status: 'Success',
      code: statusCode,
      message: message || 'success',
    });
  }

  static serverError(
    req: Request,
    res: Response,
    statusCode: number,
    message: string,
  ) {
    return res.status(statusCode).json({
      status: 'Fail',
      code: statusCode,
      message: message || 'internal server error',
    });
  }
}
export default JSONResponse;
