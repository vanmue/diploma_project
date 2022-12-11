import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return res.status(exception.getStatus()).json({
        errors: {
          [exception.name]: exception.message,
        },
      });
    } else {
      console.log('exception', exception);
      const { name, message } = exception;
      return res.status(500).json({
        errors: {
          [name]: message,
        },
      });
    }
  }
}
