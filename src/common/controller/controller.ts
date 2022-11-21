import {Response, Router} from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {injectable} from 'inversify';
import {RouteInterface} from '../../types/route.type.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ControllerInterface} from './controller.interface.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  addRoute<T extends string>(route: RouteInterface<T>) {
    this._router[route.method](route.path, asyncHandler(route.handler.bind(this)));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    res.type('application/json')
      .status(statusCode)
      .json(data);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
