import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import {validate} from 'class-validator';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {MiddlewareInterface} from '../types/middleware.interface.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private readonly dto: ClassConstructor<object>) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
