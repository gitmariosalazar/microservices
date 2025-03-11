import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../responses/ApiResponse';
import { BadRequestException } from './BadRequestException';
import { ResourceNotFoundException } from './ResourceNotFoundException';
import { ErrorHandler } from '@nestjs/common/interfaces';
import { CustomHttpException } from './CustomHttpException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: ErrorHandler, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // Default values for unexpected errors
    let statusCode = 500;
    let messages=[];

    if (exception instanceof ResourceNotFoundException) {
      statusCode = exception.getStatus();
      messages.push(exception.getResponse() as string);
    } else if (exception instanceof CustomHttpException) {
      (statusCode = exception.getStatus()),
        messages.push(exception.getResponse().valueOf() as string);
    } else if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      const arrayMessages = exception.getResponse().valueOf();
      if (Array.isArray(arrayMessages)) {
        arrayMessages.forEach((message) => {
          messages.push(message)
        });
      } else {
        messages.push(messages)
      }
    } else if (exception instanceof HttpException) {
      // Handle other HTTP exceptions
      statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();
      messages =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message || exception.message;
    } else if (exception instanceof Error) {
      // Handle standard errors
      messages.push(exception.message);
      statusCode = 500;
    }

    // Log the error for debugging
    this.logger.error(`Exception occurred: ${messages}`);

    // Build the API response
    const apiResponse = new ApiResponse(
      messages,
      null, // Data is null for errors
      request.url,
    );
    apiResponse.status_code = statusCode; // Override status_code for errors
    response.status(statusCode).json(apiResponse);
  }
}
