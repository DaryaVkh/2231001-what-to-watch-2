import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {COMPONENT} from '../../types/component.type.js';
import {ServiceError} from '../../types/service-error.enum.js';
import {createErrorObject} from '../../utils/common-functions.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ExceptionFilterInterface} from './exception-filter.interface.js';
import HttpError from './http-error.js';
import ValidationError from './validation-error.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(COMPONENT.LoggerInterface) private logger: LoggerInterface) {
    this.logger.info('Register ExceptionFilter');
  }

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    } else if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    res.status(error.httpStatusCode).json(createErrorObject(ServiceError.COMMON_ERROR, error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ServiceError.SERVICE_ERROR, error.message));
  }

  private handleValidationError(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[Validation Error]: ${error.message}`);
    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ServiceError.VALIDATION_ERROR, error.message, error.details));
  }
}
