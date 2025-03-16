import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ApiResponse } from '../responses/ApiResponse';

@Catch(RpcException)
export class RcpCustomExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  private readonly logger = new Logger(RcpCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc();
    const response = ctx.getContext();

    const errorResponse = exception.getError();
    this.logger.error(`Caught RpcException: ${JSON.stringify(errorResponse)}`);

    let apiResponse = new ApiResponse(
      'An unknown error occurred',
      null,
      response.req.url,
    );
    let statusCode = 500;

    if (typeof errorResponse === 'object' && errorResponse !== null) {
      const { statusCode: code, message } = errorResponse as {
        statusCode: number;
        message: string;
      };
      statusCode = code || 500;
      apiResponse = new ApiResponse(message, null, response.req.url);
      apiResponse.status_code = statusCode;
    } else if (typeof errorResponse === 'string') {
      apiResponse = new ApiResponse(
        errorResponse || 'An unknown error occurred',
        null,
        response.req.url,
      );
      apiResponse.status_code = statusCode;
    } else {
      apiResponse.status_code = statusCode;
    }

    response.status(statusCode).json({
      time: new Date().toISOString(),
      message: apiResponse.message,
      url: apiResponse.url,
      data: apiResponse.data,
      status_code: apiResponse.status_code,
    });
    return throwError(() => exception.getError());
  }
}
