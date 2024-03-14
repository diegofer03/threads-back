// import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
// import { Error } from 'mongoose';
// import ValidationError = Error;

// @Catch(ValidationError)
// export class AllExceptionsFilter implements RpcExceptionFilter {
//   catch(exception: ValidationError, host: ArgumentsHost): any {
//     const ctx = host.switchToHttp(),
//       response = ctx.getResponse();

//     return response.status(400).json({
//       statusCode: 400,
//       createdBy: 'ValidationErrorFilter',
//       errors: exception,
//     });
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json(exception.getResponse());
  }
}
