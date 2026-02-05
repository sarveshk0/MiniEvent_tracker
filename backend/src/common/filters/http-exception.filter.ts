import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Log internal server errors with stack traces
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${exception.message} - ${exception.stack}`,
        'UnhandledException',
      );
    }

    const responseBody = {
      success: false,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || 'Error',
      data: null,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(responseBody);
  }
}
