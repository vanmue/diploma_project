import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const error = exception as Error;
    const errors = {
      errors: {
        [error.name]: error.message,
      },
    };

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    res.status(500).json(errors);
  }
}
