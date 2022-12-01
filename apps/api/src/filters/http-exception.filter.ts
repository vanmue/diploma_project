import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const { name, message } = exception;
    switch (name) {
      case 'BadRequestException':
        const exc = exception as BadRequestException;
        return res.status(exc.getStatus()).json(exc.getResponse());
      default:
        return res.status(500).json({
          errors: {
            [name]: message,
          },
        });
    }
  }
}
