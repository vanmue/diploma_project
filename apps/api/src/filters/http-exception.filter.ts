import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const error = exception as Error;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const { name, message } = error;
    switch (name) {
      case 'BadRequestException':
        const exc = exception as BadRequestException;
        const obj = exc.getResponse() as Record<string, unknown>;
        const errors = obj.errors as Record<string, unknown>;
        res.status(400).json(errors);
      default:
        res.status(500).json({
          errors: {
            [name]: message,
          },
        });
    }
  }
}
