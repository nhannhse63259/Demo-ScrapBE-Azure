import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorRes = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error || exception.message || ''
          : 'INTERNAL SERVER ERROR',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorRes),
      'ExceptionFilter',
    );
    response.status(404).json(errorRes);
  }
}
